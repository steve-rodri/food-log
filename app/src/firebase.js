import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD4oLn23qlFnuN-cxVpyQ3yMZKjL0WA6I0",
    authDomain: "food-log-222416.firebaseapp.com",
    databaseURL: "https://food-log-222416.firebaseio.com",
    projectId: "food-log-222416",
    storageBucket: "food-log-222416.appspot.com",
    messagingSenderId: "202198739085",
    appId: "1:202198739085:web:16d206d6dcc604a214dac4",
    measurementId: "G-223VNKBH9J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
