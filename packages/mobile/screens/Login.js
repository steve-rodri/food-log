import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen, LoginForm } from "../components";
import { useSelector } from "react-redux";
import { themes } from "@fl/common";

const Login = props => {
  const styles = useStyles();
  return (
    <Screen
      main={
        <View style={styles.container}>
          <Text style={styles.heading}>Food Log</Text>
          <LoginForm />
        </View>
      }
    />
  );
};

const useStyles = () => {
  const current = useSelector(state => state.theme);
  return StyleSheet.create({
    container: {
      padding: 10
    },
    heading: {
      color: themes[current].defaultTextColor,
      fontSize: 50,
      fontFamily: "Gill Sans",
      fontWeight: "200",
      alignSelf: "center",
      padding: 15
    }
  });
};

export default Login;
