import React from 'react';
import './style.css';

//props

// food
// handleFoodSelect
// currentPage


export default function Food(props){
  const food = props.food;

  return (
    <div className="food"  onClick={props.handleFoodSelect}>
      <img className="food-image" src={food.photo.thumb} alt={food.food_name}/>
      <h6 className= "food-title">{food.serving_qty} {food.serving_unit} {food.food_name}</h6>

        <div className="macronutrients">
          <div>C:</div>
          <div>{Math.round(food.nf_total_carbohydrate)}g</div>
          <div>F:</div>
          <div>{Math.round(food.nf_total_fat)}g</div>
          <div>P:</div>
          <div>{Math.round(food.nf_protein)}g</div>
        </div>
    </div>
  )
}
