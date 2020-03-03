import React from "react";
import Metrics from '../Metrics/'
import "./style.css";

const Meal = ({ meal, onSelect, onDelete, editMode }) => {
  return (
    <div className="Meal" onClick={onSelect}>
      <div className="Meal-Image"/>
      <MealContents meal={meal}/>
      {editMode?
        <DeleteButton onDelete={onDelete}/>:
        <Metrics data={meal.contents}/>
      }
    </div>
  );
}

const MealContents = ({ meal }) => {
  return (
    <div className="Meal-Contents">
      <h3>{meal.title}</h3>
      <div className="Meal-Ingredients">
        {meal.contents.map((food, id) => (
          <p key={id}>
            {food.servingQty} {food.servingUnit} {food.foodName}
          </p>
        ))}
      </div>
    </div>
  )
}

const DeleteButton = ({ onDelete }) => {
  return (
    <button className="delete-button" onClick={onDelete}>
      Delete
    </button>
  );
}

export default Meal
