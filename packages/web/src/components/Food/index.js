import React from "react";
import Metrics from '../Metrics'
import "./style.css";

export default function Food({ food, onSelect, onDelete, editMode }) {
  return (
    <div className="Food" onClick={onSelect}>
      <img src={food.photo.thumb} alt={food.foodName} />
      <Details food={food}/>
      {editMode?
        <DeleteButton onDelete={onDelete} editMode={editMode}/>:
        <Metrics data={food}/>
      }
    </div>
  );
}

const DeleteButton = ({ onDelete, editMode }) => (
  <button className="delete-button" onClick={onDelete}>
    Delete
  </button>
)

const Details = ({ food: { foodName, servingQty, servingUnit, servingWeightGrams }}) => (
  <div className="Food-Details">
    <h4>{upCase(foodName)}</h4>
    <div>
      <h5>{`${servingQty} ${servingUnit}`}</h5>
      <h5>{`${servingWeightGrams}g`}</h5>
    </div>
  </div>
)

function upCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
