import React from 'react';
import Food from '../../../Food';
import './style.css';

// props

// meal
// onSelectFood

export default function Meal(props){
  return (
    <div className='meal'>
    {props.meal.map(food =>
      <Food
        food={food}
        handleFoodSelect={() => props.onSelectFood(food, "Log")}
      />
    )}
    </div>
  )
}
