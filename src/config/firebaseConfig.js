import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig ={
    apiKey: "AIzaSyDmFAe3xvLEpJIb6oeBMBaP9vL9v_ce0dU",
    authDomain: "cityhack21-6404b.firebaseapp.com",
    projectId: "cityhack21-6404b",
    storageBucket: "cityhack21-6404b.appspot.com",
    messagingSenderId: "59151853397",
    appId: "1:59151853397:web:114a412b55102a146c71dc",
    measurementId: "G-RLLP663YT3"
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();
