import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux'
import { setView, fetchUserSuccess, fetchUserRejected } from '../../redux'
import './style.css';

export default function Login(props){
  const dispatch = useDispatch()

  const onSuccess = (resp) => {
    localStorage.setItem('google_access_token',resp.accessToken)
    dispatch(fetchUserSuccess(resp.profileObj))
    dispatch(setView("NatLang"))
  }

  const onFailure = (resp) => {
    dispatch(fetchUserRejected(resp))
  }

  return (
    <div className="Page">
      <div className="Login">
        <h1>Food Log</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    </div>
  )
}
