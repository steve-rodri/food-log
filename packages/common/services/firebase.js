import firebase from "firebase";
import * as helpers from "../helpers";
import redux from "../redux";
const { keysToCamel } = helpers;
const {
  store: { dispatch },
  actions: { setView, fetchUserSuccess, fetchUserRejected }
} = redux;

const firebaseConfig = {
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

const onSuccess = resp => {
  const {
    credential,
    additionalUserInfo: { profile }
  } = resp;
  if (credential.signInMethod === "google.com") {
    localStorage.setItem("google_access_token", resp.credential.accessToken);
  }
  dispatch(fetchUserSuccess(keysToCamel(profile)));
  dispatch(setView("NatLang"));
};

const onFailure = resp => dispatch(fetchUserRejected(resp));

export const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: onSuccess,
    signInFailure: onFailure
  },
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};
