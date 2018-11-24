import React from 'react';
import Food from '../../../Food';
import './style.css';

export default function Misc(props){
  return (
    <div>
      {props.misc.map((food, id) =>
        <Food
          food={food}
          key={id}
          handleFoodSelect={(e) => {
            props.onSelectFood(food);
            console.log("misc food select from log");
          }}
          editMode={props.editMode}
          handleDelete={props.handleDelete}
        />
      )}
    </div>
  )
}

function renderDeleteButton(props){
  return(
    <button
      className="delete-button"
      onClick={props.handleDelete}
    >Delete
    </button>
  )
}
