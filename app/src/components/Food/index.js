import React from "react";
import Macros from '../Macros/index.js'
import "./style.css";

export default function Food(props) {
  const food = props.food;
  return (
    <div className="food" onClick={props.handleFoodSelect}>
      <img className="food-image" src={food.photo.thumb} alt={food.food_name} />
      <h6 className="food-title">
        {food.serving_qty} {food.serving_unit} {food.food_name}
      </h6>
      {renderDeleteButton(props)}
      {renderMacros(props)}
    </div>
  );
}

function renderDeleteButton(props){
  if (props.addFoodView === "Basket") {
    return deleteButton(props)
  } else if (props.editMode) {
    return deleteButton(props)
  }
}

function renderMacros(props){
  const food = props.food;
  if (!props.editMode) {
    if (!(props.appView === 'Add Food')) {
      return <Macros food={food}/>
    }
  }
}

function deleteButton(props) {
  return (
    <button className="delete-button" onClick={props.handleDelete}>
      Delete
    </button>
  );
}
