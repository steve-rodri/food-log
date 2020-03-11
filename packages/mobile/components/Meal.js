import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { DeleteButton, Metrics } from "../components";
import PropTypes from "prop-types";

const Meal = ({ meal, onSelect, onDelete, editMode }) => {
  return (
    <View style={mealStyles.container} onPress={onSelect}>
      {/* <ImageCollage meal={meal} /> */}
      <MealContents meal={meal} />
      {editMode ? (
        <DeleteButton onDelete={onDelete} />
      ) : (
        <Metrics data={meal.contents} />
      )}
    </View>
  );
};

const MealContents = ({ meal }) => {
  return (
    <View style={contentStyles.container}>
      <Text>{meal.title}</Text>
      <FlatList
        data={meal.contents}
        renderItem={({ food }) => (
          <Text>
            {food.servingQty} {food.servingUnit} {food.foodName}
          </Text>
        )}
        keyExtractor={({ food, index }) => index}
      />
    </View>
  );
};

// const ImageCollage = ({ meal }) => {
//   return (
//     <View>
//       <Grid></Grid>
//       {meal.contents.map(food => (
//         <img src={food.photo.thumb} alt={food.foodName} />
//       ))}
//     </View>
//   );
// };

const mealStyles = StyleSheet.create({
  container: {}
});

const contentStyles = StyleSheet.create({
  container: {}
});

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  editMode: PropTypes.func
};

MealContents.propTypes = {
  meal: PropTypes.object.isRequired
};

export default Meal;
