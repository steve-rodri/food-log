import React from "react";
import Macros from '../Macros/index.js'
import data from "../../NutrientConversion";
import "./style.css";

export default function Food(props) {
  const food = props.food;

  return (
    <div className="food" onClick={props.handleFoodSelect}>
      <img className="food-image" src={food.photo.thumb} alt={food.food_name} />
      <h6 className="food-title">
        {food.serving_qty} {food.serving_unit} {food.food_name}
      </h6>
      {props.appView === "Add Food" &&
        props.addFoodView === "Basket" &&
        renderDeleteButton(props)}
      {props.editMode && renderDeleteButton(props)}
      {!props.editMode && <Macros food={props.food} />}
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
