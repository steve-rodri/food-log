import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import { setView, fetchUserSuccess, fetchUserRejected } from '../../redux'
import { keysToCamel } from '../../helpers'
import './style.css';

export default function Login(props){
  const dispatch = useDispatch()

  const onSuccess = (resp) => {
    const { credential, additionalUserInfo: { profile } } = resp
    if (credential.signInMethod === "google.com") {
      localStorage.setItem('google_access_token',resp.credential.accessToken)
    }
    dispatch(fetchUserSuccess(keysToCamel(profile)))
    dispatch(setView("NatLang"))
  }

  const onFailure = (resp) => {
    dispatch(fetchUserRejected(resp))
  }

  const uiConfig = {
  signInFlow: 'redirect',
  callbacks: {
    signInSuccessWithAuthResult: onSuccess,
    signInFailure: onFailure
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

  return (
    <div className="Page">
      <div className="Login">
        <h1>Food Log</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    </div>
  )
}
