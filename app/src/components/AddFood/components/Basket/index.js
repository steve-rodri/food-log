import React from 'react';
import Food from '../../../Food';
import './style.css';

export default function Basket (props) {
  return (
    <div className="Page" id="basket-page">
      <header>
        <h1 id="title">Basket</h1>
        {props.basket.contents.length > 0 && <button id="empty-basket-button" onClick={props.emptyBasket}>Delete All</button>}
      </header>
      <main>
        {props.basket.contents.length > 0 && renderBasket(props)}
      </main>
      <footer>

        <button
          className= "back-button"
          onClick={() => props.handleViewChange('Single Item')}
        >Back
        </button>

        <button
          className="log-button"
          onClick={props.logBasket}
        >Log
        </button>

      </footer>
    </div>
  )
}

function renderBasket(props){
  return(
    <div>
      <div className="meals">
        {props.basket.contents.map( (food, id) =>
          <Food
            food={food}
            key={id}
            data-id={id}
            addFoodView={props.addFoodView}
            appView={props.appView}
            handleFoodSelect={(e) => {
              props.onSelect(id);
            }}
            handleDelete={(e) => {
              e.stopPropagation();
              props.onDelete(id);
            }}
          />
        )}
      </div>
    </div>
  )
}
