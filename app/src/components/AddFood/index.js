import React from 'react';
import moment from 'moment';

export default function AddFood(props){

  return (
    <div>
      <h1>Hey {props.userName}, what's for {props.mealType()}?</h1>
      <div>
        <textarea
          name="natLangQueryInput"
          value={props.natLangQueryInput}
          onChange={props.handleNatLangInputChange}
          ></textarea>
        <button
          onClick={props.handleNatLangQuery}
          >Log</button>
      </div>
    </div>
  )
}
