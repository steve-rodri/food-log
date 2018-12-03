import React from 'react';
import data from '../../NutrientConversion';
import './style.css';

export default function Food(props){
  const food = props.food;

  return (
    <div className="food" onClick={props.handleFoodSelect} >
      <img className="food-image" src={food.photo.thumb} alt={food.food_name}/>
      <h6 className= "food-title">{food.serving_qty} {food.serving_unit} {food.food_name}</h6>
        {props.appView === "Add Food" && props.addFoodView === "Basket" && renderDeleteButton(props)}
        {props.editMode && renderDeleteButton(props)}
        {!props.editMode && renderMetrics(props)}
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

function renderMetrics(props) {
  const { food } = props
  const nutrientValue = nutrientOfFood(food, findIdOfNutrient('Calories')).value;
  const Calories = Math.round(nutrientValue, 1);
  return (
    <div className='total-calories'>
      {Calories}
    </div>
  )
}

function nutrientOfFood(food, id){
  const nutrient = food.full_nutrients.filter(nutrient => nutrient.attr_id === id);
  return nutrient[0];
}

function findIdOfNutrient(name){
  const nutrient = data.filter(nutrient => nutrient.name === name);
  return nutrient[0].attr_id;
}

function renderDeleteButton(props){
  return(

      <button
        className="delete-button"
        onClick={props.handleDelete}
      >Delete</button>

  )
}
