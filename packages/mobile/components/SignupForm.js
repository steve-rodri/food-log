import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { InputField, Buttons } from "../components";
import { useSelector } from "react-redux";
import { themes } from "@fl/common";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        blurOnSubmit={true}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        autoCompleteType="password"
        textContentType="newPassword"
        secureTextEntry={true}
      />
      <Buttons style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Buttons>
    </View>
  );
};

const useStyles = () => {
  const current = useSelector(state => state.theme);
  return StyleSheet.create({
    container: {},
    button: {
      padding: 40,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch"
    },
    buttonText: {
      color: themes[current].defaultButtonTextColor,
      fontSize: 25
    }
  });
};

export default SignupForm;
