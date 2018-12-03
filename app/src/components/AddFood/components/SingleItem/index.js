import React from 'react';
import Food from '../../../Food';
import './style.css';

export default function SingleItem(props){
  const searchResults = props.searchResults;
  return (
    <div className="Page" id="single-item-search-page">
      <header>
        <button
          className="back-button-top"
          onClick={()=> props.handleViewChange('Nat Lang')}
        >Back
        </button>
        <h1 className="title" >Search</h1>
      </header>
      <main>

        <form id="single-item-search" onSubmit={props.handleSingleItemQuery}>
          <input
            name="singleItemInput"
            id="search-input"
            value={props.singleItemInput}
            onChange={props.handleSingleItemInputChange}
            placeholder="..."
          />
        </form>

        {searchResults && listFoods(props, searchResults)}

      </main>
      <footer>
        <button
          id="basket"
          onClick={() => props.handleViewChange('Basket')}
        >
          basket: {props.basket.contents.length}
        </button>
        <button
          onClick={props.handleLogBasket}
          className="log-button"
        >Log</button>
      </footer>
    </div>
  )
}

function listFoods(props, results){
  const commonFoodsArr = [...results.common];
  const brandedFoodsArr = [...results.branded];

  const commonFoods = commonFoodsArr.sort((x,y) => {
    return x.food_name.length - y.food_name.length
  })
  const brandedFoods = brandedFoodsArr.sort( (x,y) => {
    return x.food_name.length - y.food_name.length
  })

  return (
    <div id="results">

      { /* common foods */ }
      <div className="food-group">
        {commonFoods.map( (food, id) =>
          <Food
            food={food}
            handleFoodSelect={() => props.onSelectFood(food)}
            key={id}
            appView={props.appView}
          />
        )}
      </div>

      { /*branded foods */ }
      <div className="food-group">
        {brandedFoods.map( (food, id) =>
          <Food
            food={food}
            handleFoodSelect={() => props.onSelectFood(food)}
            key={id}
            appView={props.appView}
          />
        )}
      </div>

    </div>
  )
}
