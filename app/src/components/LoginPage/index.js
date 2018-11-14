import React from 'react';
import GoogleLogin from 'react-google-login';
import './style.css';

export default function LoginPage(props){
  return (
    <div id="login-page">
      <main className="login-message">
        <h1>Food Log</h1>
        <p>...the food log you actually want to use.</p>
      </main>
      <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Login with Google"
    onSuccess={props.responseGoogle}
    onFailure={props.responseGoogle}
    id="google-login"
  />
    </div>
  )
}
