import React from 'react';
import moment from 'moment';
import './style.css';

export default function AddFood(props){

  return (
    <div className="Page" id="add-food-page">
      <header id="greeting">
        <h1>Hey {props.userName},</h1>
        <h1>What's for {props.mealType()}?</h1>

      </header>
      <main id="natLangSearch">
        <textarea
          name="natLangQueryInput"
          value={props.natLangQueryInput}
          onChange={props.handleNatLangInputChange}
          placeholder={`Try typing something like...\n\n"I had 1 sweet potato and a cup of black beans" \n\n You could even input a whole recipe...`}
        >
        </textarea>
      </main>
      <footer>
        <button
          onClick={props.handleNatLangQuery}
          id="log-button"
        >Add</button>
      </footer>
    </div>
  )
}
