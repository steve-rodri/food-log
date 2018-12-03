import React from 'react';
import './style.css';

export default function AddMealTitle (props){

  return (
    <div className="Page" id="add-meal-title-page">
      <form className="add-meal-title-form" onSubmit={(e) => props.handleAddClick(e)}>

        {/* <h2 className="form-title" id="photo-title-prompt">Take a Photo:</h2>

          <input
            id="photo-upload"
            type="file"
            name='mealPhoto'
            src={props.mealPhoto}
            onChange={props.handleMealPhotoChange}
          ></input> */}

        <h2 className="form-title" id='meal-title-prompt'>Give This Meal A Name:</h2>

          <input
            name="mealTitleInput"
            id="meal-title-input"
            value= {props.mealTitleInput}
            onChange={props.handleMealTitleInputChange}
          />

        <button
          id="skip-button"
          onClick={props.handleSkipClick}
        >Skip</button>

        <button
          id="add-button"
          type="submit"
          onClick={(e) => props.handleAddClick(e)}
        >Add</button>

      </form>
    </div>
  )
}
