import React from "react";
import "./style.css";
import Macros from '../../../Macros/index.js'

export default function Meal(props) {
  return (
    <div className="meal" onClick={props.handleMealSelect}>
      <div className="meal-image" />
      <div className="meal-contents">
        <h4 className="meal-title">{props.meal.title}</h4>
        <div className="ingredients">
          {props.meal.contents.map((food, id) => (
            <h6 key={id} className="ingredient">
              {food.serving_qty} {food.serving_unit} {food.food_name}
            </h6>
          ))}
        </div>
      </div>

      {props.editMode && renderDeleteButton(props)}
      {!props.editMode && <Macros food={props.meal.contents}/>}
    </div>
  );
}


function renderDeleteButton(props) {
  return (
    <button className="delete-button" onClick={props.handleDelete}>
      Delete
    </button>
  );
}
