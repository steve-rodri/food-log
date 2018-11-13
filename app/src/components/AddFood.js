import React from 'react';
import moment from 'moment';

export default function AddFood(props){

  return (
    <div>
      <h1>Hey {props.userName}, what's for {props.mealType()}?</h1>
      <form>
        <textarea></textarea>
        <button>Log</button>
      </form>
    </div>
  )
}
