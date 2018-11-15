import React from 'react';
import Food from '../../../Food';
import './style.css';

export default function Misc(props){
  return (
    <div>
      {props.misc.map(food =>
        <Food
          food={food}
        />
      )}
    </div>
  )
}
