import React from 'react';
import { getSumOfNutrientFromFood } from '../../nutrientHelpers';
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
