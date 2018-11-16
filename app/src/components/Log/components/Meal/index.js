import React from 'react';
import Food from '../../../Food';
import './style.css';

// props

// meal
// onSelectFood
// editMode
// handleDelete

export default function Meal(props){
  return (
    <div className='meal'>
      <div className='meal-image'>
      </div>
      <div className="ingredients">
        {props.meal.map( (food, id) =>
          <h6 key={id} className="ingredient" >{food.serving_qty} {food.serving_unit} {food.food_name}</h6>
        )}
      </div>
      {props.editMode && renderDeleteButton(props)}
    </div>
  )
}


function renderDeleteButton(props){
  return(

      <button
        className="delete-button"
        onClick={props.handleDelete}
      >Delete</button>

  )
}

// {props.meal.map(food =>
//   <Food
//     food={food}
//     handleFoodSelect={() => props.onSelectFood(food, "Log")}
//     editMode={props.editMode}
//   />
// )}
