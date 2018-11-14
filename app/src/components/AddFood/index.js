import React from 'react';
import moment from 'moment';
import './style.css';

export default function AddFood(props){

  return (
    <div id="add-food-page">
      <h1 id="greeting" >Hey {props.userName},{'\n'}What's for {props.mealType()}?</h1>
      <main>
        <div>
          <p>Try typing something like...</p>
          <p>"For lunch I had 1 sweet potato and a cup of black beans"</p>
          <p>You could even input a whole recipe...</p>
        </div>
        <textarea
          name="natLangQueryInput"
          value={props.natLangQueryInput}
          onChange={props.handleNatLangInputChange}
          >
          </textarea>
      </main>
      <footer>
      <button
        onClick={props.handleNatLangQuery}
        id="log-button"
        >Log</button>
      </footer>
    </div>
  )
}
