import React from "react";
import MacroNutrients from "./MacroNutrients";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { helpers } from "@fl/common";

const Metrics = ({ data }) => {
  const {
    nutrient: { getSumOfNutrientFromFood }
  } = helpers;
  const calories = getSumOfNutrientFromFood(data, "Calories");
  return (
    <View style={styles.container}>
      <Text style={styles.calories}>{calories}</Text>
      <MacroNutrients food={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  calories: {}
});

Metrics.propTypes = {
  data: PropTypes.object.isRequired
};

export default Metrics;
