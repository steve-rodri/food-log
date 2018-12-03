import React from 'react';
import data from "../../NutrientConversion";
import './style.css';


export default function Macros(props){
  const food = props.food;

  const calories = getSumOfNutrientFromFood(food, 'Calories');
  const protein = getSumOfNutrientFromFood(food, 'Protein');
  const carbs = getSumOfNutrientFromFood(food, 'Carbohydrate');
  const fat = getSumOfNutrientFromFood(food, 'Total lipid (fat)');

  return (
    <div className="metrics">
      <div className="total-calories">{calories}</div>
      <div className="macronutrients">
        <div className="protein-label">P:</div>
        <div className="protein-value">{protein}</div>
        <div className="carbs-label">C:</div>
        <div className="carbs-value">{carbs}</div>
        <div className="fat-label">F:</div>
        <div className="fat-value">{fat}</div>
      </div>
    </div>
  )
}

function getSumOfNutrientFromFood(food, nutrientName){
  if (Array.isArray(food)) {
    const nutrientValues = food.map(ingredient => {
      const nutrientValue = nutrientOfFood(ingredient, findIdOfNutrient(nutrientName))
        .value;
      return nutrientValue;
    });
    const sum = nutrientValues.reduce((a, b) => a + b);
    const total = Math.round(sum, 1);
    return total;
  } else {
    const nutrientValue = nutrientOfFood(food, findIdOfNutrient(nutrientName))
      .value;
    return Math.round(nutrientValue, 1);
  }
}

function nutrientOfFood(food, id) {
  const nutrient = food.full_nutrients.filter(
    nutrient => nutrient.attr_id === id
  );
  return nutrient[0];
}

function findIdOfNutrient(name) {
  const nutrient = data.filter(nutrient => nutrient.name === name);
  return nutrient[0].attr_id;
}
