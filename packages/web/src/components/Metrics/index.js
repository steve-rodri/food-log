import React from "react";
import MacroNutrients from "../MacroNutrients";
import { helpers } from "@fl/common";
import "./style.css";

const Metrics = ({ data }) => {
  const {
    nutrient: { getSumOfNutrientFromFood }
  } = helpers;
  const calories = getSumOfNutrientFromFood(data, "Calories");
  return (
    <div className="Metrics">
      <div className="Metrics-Calories">{calories}</div>
      <MacroNutrients food={data} />
    </div>
  );
};

export default Metrics;
