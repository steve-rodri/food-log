import React from "react";
import { StyleSheet, Text } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import PropTypes from "prop-types";
import { helpers } from "@fl/common";

const MacroNutrients = ({ food }) => {
  const {
    nutrient: { getSumOfNutrientFromFood }
  } = helpers;
  const protein = getSumOfNutrientFromFood(food, "Protein");
  const carbs = getSumOfNutrientFromFood(food, "Carbohydrate");
  const fat = getSumOfNutrientFromFood(food, "Total lipid (fat)");
  return (
    <Grid style={styles.container}>
      <Col>
        <Row>
          <Text style={styles.name}>P:</Text>
        </Row>
        <Row>
          <Text style={styles.name}>C:</Text>
        </Row>
        <Row>
          <Text style={styles.name}>F:</Text>
        </Row>
      </Col>
      <Col>
        <Row>
          <Text style={styles.value}>{protein}g</Text>
        </Row>
        <Row>
          <Text style={styles.value}>{carbs}g</Text>
        </Row>
        <Row>
          <Text style={styles.value}>{fat}g</Text>
        </Row>
      </Col>
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {},
  name: {},
  value: {}
});

MacroNutrients.propTypes = {
  food: PropTypes.object.isRequired
};

export default MacroNutrients;
