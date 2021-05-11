import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD75Iz9_gFDoSu9bt2agtNRV90GYGdkIRY',
  authDomain: 'sitetrace-trial.firebaseapp.com',
  projectId: 'sitetrace-trial',
  storageBucket: 'sitetrace-trial.appspot.com',
  messagingSenderId: '773824210826',
  appId: '1:773824210826:web:2d733fcf4c097b253d4a73',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };
