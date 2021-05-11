import { StyleSheet } from 'react-native';

const ELEMENT_MARGIN = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e2e2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#416a58',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginLeft: 10,
  },
  orders: {
    width: '100%',
    marginVertical: 5,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  orderName: {
    fontWeight: 'bold',
  },
  waiter: {
    marginTop: 30,
  },
  date: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  orderDate: {
    color: '#000',
    alignSelf: 'flex-end',
  },
  label: {
    color: '#707070',
  },
  newOrderButton: {
    height: 40,
    minWidth: 200,
    backgroundColor: '#3E53BA',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    padding: 10,
    borderRadius: 15,
    margin: 10,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: ELEMENT_MARGIN,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: 'bottom',
    paddingBottom: 5,
  },
  waiterNameField: {
    borderBottomWidth: 2,
    width: '100%',
    height: 40,
    marginVertical: ELEMENT_MARGIN,
    paddingHorizontal: 10,
  },
  dishSelectorContainer: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    marginVertical: ELEMENT_MARGIN,
  },
  dishSelector: {
    width: '100%',
  },
  priceContainer: {
    marginVertical: ELEMENT_MARGIN,
  },
  ingredientsContainer: {
    marginVertical: ELEMENT_MARGIN,
  },
  dateContainer: {
    marginVertical: ELEMENT_MARGIN,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateInput: {
    height: 40,
    borderWidth: 1,
    width: 150,
    marginTop: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },
  photoUploadButton: {
    marginVertical: ELEMENT_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#708F82',
  },
  createOrderButton: {
    height: 40,
    minWidth: 200,
    backgroundColor: '#ED4444',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  attachments: {
    flexDirection: 'row',
  },
});

export default styles;
