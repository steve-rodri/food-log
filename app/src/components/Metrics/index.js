import React from 'react';
import MacroNutrients from '../MacroNutrients'
import { getSumOfNutrientFromFood } from '../../nutrientHelpers';
import './style.css';

const Metrics = ({ data }) => {
  const calories = getSumOfNutrientFromFood(data, 'Calories');
  return (
    <div className="Metrics">
      <div className="Metrics-Calories">{calories}</div>
      <MacroNutrients food={data}/>
    </div>
  )
}


export default Metrics
