import React from 'react';
import Food from '../../../Food';
import './style.css';

// props

// misc
// onSelectFood
// editMode
// handleDelete

export default function Misc(props){
  return (
    <div>
      {props.misc.map(food =>
        <Food
          food={food}
          handleFoodSelect={(e) => {
            e.stopImmediatePropagation();
            props.onSelectFood(food, "Log")
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
