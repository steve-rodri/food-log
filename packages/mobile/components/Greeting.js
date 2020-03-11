import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { helpers } from "@fl/common";

const Greeting = () => {
  const user = useSelector(state => state.user);
  const { timeOfDay, getMealTypebyTime } = helpers;
  const {
    data: { givenName }
  } = user;
  return (
    <View style={styles.container}>
      {givenName ? <Text>{`Good ${timeOfDay()} ${givenName},`}</Text> : null}
      <Text>{`What's for ${getMealTypebyTime()}`}</Text>
    </View>
  );
};

Greeting.propTypes = {};

const styles = StyleSheet.create({
  container: {}
});

export default Greeting;
