import React from 'react';
import './style.css';

export default function Meal(props){
  return (
    <div className='meal' onClick={props.handleMealSelect}>
      <div className='meal-image'></div>
        <div className='meal-contents'>
          <h4 className='meal-title'>{props.meal.mealTitleInput}</h4>
          <div className="ingredients">
            {props.meal.contents.map( (food, id) =>
              <h6 key={id} className="ingredient" >{food.serving_qty} {food.serving_unit} {food.food_name}</h6>
            )}
          </div>
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
