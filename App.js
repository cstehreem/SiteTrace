import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

import Constants from './Constants';
import { firestore, storage } from './firebase';

export default function App() {
  const [isOrderModalVisible, setOrderModalVisibility] = useState(false);
  const [selectedDish, setSelectedDish] = useState(Constants.PLACEHOLDER_DISH);
  const [date, setDate] = useState(new Date());
  const [isDateModalVisible, setDateModalVisibility] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const ordersHandleRef = useRef();

  const [waiterName, setWaiterName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Get available dishes
    firestore
      .collection('dishes')
      .get()
      .then((snapshot) => {
        const dishes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllDishes(dishes);
      });

    // Subscribe to changes in orders
    ordersHandleRef.current = firestore
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }));
        setAllOrders(orders);
      });

    return () => ordersHandleRef.current();
  }, []);

  function dateChanged(event, selectedDate) {
    const currentDate = selectedDate || date;
    setDateModalVisibility(false);
    setDate(currentDate);
  }

  function card({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderPrice}>Price: ${item.price}</Text>
        <Text style={styles.orderPrice}>
          Ingredients: {item.ingredients.map((i) => i + ', ')}
        </Text>
        <Text style={styles.waiter}>Waiter: {item.waiterName}</Text>
        <View style={styles.date}>
          <Text style={styles.label}>Date Entered:</Text>
          <Text style={styles.orderDate}>
            {Constants.MONTHS[item.createdAt.getMonth()]}{' '}
            {item.createdAt.getDate()}th
          </Text>
        </View>
      </View>
    );
  }

  async function createOrder() {
    try {
      if (
        JSON.stringify(selectedDish) ===
        JSON.stringify(Constants.PLACEHOLDER_DISH)
      ) {
        return;
      }
      firestore
        .collection('orders')
        .doc()
        .set({
          name: selectedDish.name,
          price: selectedDish.price,
          waiterName: waiterName,
          ingredients: selectedDish.ingredients,
          createdAt: date,
          photos: selectedImages.map((i) => i.name),
        });

      for (let i = 0; i < selectedImages.length; i++) {
        const image = await fetch(selectedImages[i].uri);
        const blob = await image.blob();
        var ref = storage.ref().child(selectedImages[i].name);
        await ref.put(blob);
        console.log('uploaded');
      }
    } catch (error) {
      console.log(error);
    }
    setOrderModalVisibility(false);
  }

  async function selectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission not granted');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages((prev) => [
        ...prev,
        { name: result.uri.replace(/^.*[\\/]/, ''), uri: result.uri },
      ]);
    }
  }

  function resetState() {
    setWaiterName('');
    setSelectedDish(Constants.PLACEHOLDER_DISH);
    setDate(new Date());
    setSelectedImages([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isOrderModalVisible}
        onRequestClose={() => setOrderModalVisibility(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Order</Text>
              <TouchableWithoutFeedback
                onPress={() => setOrderModalVisibility(false)}
              >
                <AntDesign name="close" size={32} color="black" />
              </TouchableWithoutFeedback>
            </View>
            <TextInput
              style={styles.waiterNameField}
              placeholder="Waiter Name"
              value={waiterName}
              onChangeText={setWaiterName}
            />
            <View style={styles.dishSelectorContainer}>
              <Picker
                style={styles.dishSelector}
                mode="modal"
                selectedValue={selectedDish}
                onValueChange={(itemValue, itemIndex) => {
                  if (itemIndex === 0) {
                    setSelectedDish(Constants.PLACEHOLDER_DISH);
                  } else {
                    setSelectedDish(itemValue);
                  }
                }}
              >
                <Picker.Item label="Select Dish" value="" key="placeholder" />
                {allDishes.map((dish) => (
                  <Picker.Item label={dish.name} value={dish} key={dish.name} />
                ))}
              </Picker>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>Price:</Text>
              <Text>
                {selectedDish.price !== '' ? `${selectedDish.price}` : ''}
              </Text>
            </View>
            <View style={styles.ingredientsContainer}>
              <Text style={styles.label}>Ingredients:</Text>
              <Text>{selectedDish.ingredients.map((i) => i + ', ')}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Date Entered:</Text>
              <View style={styles.dateField}>
                <Text style={styles.dateInput}>{`${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`}</Text>
                <TouchableWithoutFeedback
                  onPress={() => setDateModalVisibility(true)}
                >
                  <AntDesign name="calendar" size={32} color="black" />
                </TouchableWithoutFeedback>
              </View>
            </View>
            {isDateModalVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display="spinner"
                onChange={dateChanged}
              />
            )}
            <TouchableWithoutFeedback onPress={() => selectImage()}>
              <View style={styles.photoUploadButton}>
                <AntDesign name="clouduploado" size={32} color="#708F82" />
                <Text>Upload Photo</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>Photo Attachments:</Text>
              <View style={styles.attachments}>
                {selectedImages.map((i, index) => (
                  <Image
                    key={index.toString()}
                    source={{ uri: i.uri }}
                    style={styles.image}
                  />
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => createOrder()}>
            <View style={styles.createOrderButton}>
              <Text style={styles.buttonText}>Create Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.header}>
        <Entypo name="menu" size={32} color="white" />
        <Text style={styles.title}>Ratatouille</Text>
      </View>
      <FlatList
        style={styles.orders}
        data={allOrders}
        renderItem={card}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => {
          resetState();
          setOrderModalVisibility(true);
        }}
      >
        <View style={styles.newOrderButton}>
          <Text style={styles.buttonText}>Add New Order</Text>
        </View>
      </TouchableOpacity>
      <StatusBar backgroundColor="#416a58" />
    </SafeAreaView>
  );
}
