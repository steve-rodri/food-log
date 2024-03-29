import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { redux, helpers } from "@fl/common";
import "./style.css";

const {
  actions: { setView, fetchUserSuccess, fetchUserRejected }
} = redux;

export default function Login(props) {
  const dispatch = useDispatch();

  const onSuccess = resp => {
    const {
      credential,
      additionalUserInfo: { profile }
    } = resp;
    if (credential.signInMethod === "google.com") {
      localStorage.setItem("google_access_token", resp.credential.accessToken);
    }
    dispatch(fetchUserSuccess(helpers.keysToCamel(profile)));
    dispatch(setView("NatLang"));
  };

  const onFailure = resp => {
    dispatch(fetchUserRejected(resp));
  };

  const uiConfig = {
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: onSuccess,
      signInFailure: onFailure
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  };

  return (
    <div className="Page">
      <div className="Login">
        <h1>Food Log</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}
