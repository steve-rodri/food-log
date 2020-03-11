import React from "react";
import { View, StyleSheet } from "react-native";
import SignupForm from "./SignupForm";
// import { GoogleSigni"./SignupForm";;; "@react-native-community/google-signin";
// import { useSelector } from "react-redux";

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
};

// const GoogleAuth = () => {
//   const loading = useSelector(state => state.user.loading);
//   return (
//     <GoogleSigninButton
//       size={GoogleSigninButton.Size.Standard}
//       color={GoogleSigninButton.Color.Light}
//       disabled={loading}
//     />
//   );
// };

const styles = StyleSheet.create({
  container: {}
});

export default LoginForm;
