import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { DeleteButton, Metrics } from "../components";
import PropTypes from "prop-types";
import { helpers } from "@fl/common";

const Food = ({ food, onSelect, onDelete, editMode }) => {
  return (
    <View style={foodStyles.container} onPress={onSelect}>
      <Image source={food.photo.thumb} style={foodStyles.image} />
      <Details food={food} />
      {editMode ? (
        <DeleteButton onDelete={onDelete} />
      ) : (
        <Metrics data={food} />
      )}
    </View>
  );
};

const Details = ({
  food: { foodName, servingQty, servingUnit, servingWeightGrams }
}) => (
  <View style={detailStyles.container}>
    <Text style={detailStyles.title}>
      {foodName && helpers && helpers.upCase(foodName)}
    </Text>
    <View style={detailStyles.serving}>
      <Text
        style={detailStyles.servingText}
      >{`${servingQty} ${servingUnit}`}</Text>
      <Text style={detailStyles.servingText}>{`${servingWeightGrams}g`}</Text>
    </View>
  </View>
);

const foodStyles = StyleSheet.create({
  container: {},
  image: {}
});

const detailStyles = StyleSheet.create({
  container: {},
  title: {},
  serving: {}
});

Food.propTypes = {
  food: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  editMode: PropTypes.func
};

Details.propTypes = {
  food: PropTypes.object.isRequired
};
