import React from 'react';
import Food from '../../../Food';
import './style.css';

// props

// misc
// onSelectFood

export default function Misc(props){
  return (
    <div>
      {props.misc.map(food =>
        <Food
          food={food}
          handleFoodSelect={() => props.onSelectFood(food, "Log")}
        />
      )}
    </div>
  )
}
