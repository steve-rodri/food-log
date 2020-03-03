import React from 'react'
import { getSumOfNutrientFromFood } from '../../nutrientHelpers';
import "./styles.css"

const MacroNutrients = ({ food }) => {
  const protein = getSumOfNutrientFromFood(food, 'Protein');
  const carbs = getSumOfNutrientFromFood(food, 'Carbohydrate');
  const fat = getSumOfNutrientFromFood(food, 'Total lipid (fat)');
  return (
    <div className="MacroNutrients">
      <p className="MacroNutrients-Name">P:</p>
      <p>{protein}g</p>
      <p className="MacroNutrients-Name">C:</p>
      <p>{carbs}g</p>
      <p className="MacroNutrients-Name">F:</p>
      <p>{fat}g</p>
    </div>
  )
}

export default MacroNutrients
