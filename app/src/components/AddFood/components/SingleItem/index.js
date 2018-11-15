import React from 'react';
import Food from '../../../Food';
import './style.css';

//props

// singleItemInput
// handleSingleItemInputChange
// handleSingleItemQuery
// searchItems
// onSelectFood
// logBasket

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
      <div className="food-group">
        {commonFoods.map( food =>
          <Food
            food={food}
            handleFoodSelect={() => props.onSelectFood(food, "Add Food")}
            key={food.ndb_no}
          />
        )}
      </div>
      <div className="food-group">
        {brandedFoods.map( food =>
          <Food
            food={food}
            handleFoodSelect={() => props.onSelectFood(food, "Add Food")}
            key={food.ndb_no}
          />
        )}
      </div>
    </div>
  )
}

export default function SingleItem(props){
  const searchResults = props.searchItems;
  return (
    <div className="Page" id="single-item-search-page">
      <header>
        <h1>Search</h1>
      </header>
      <main>

        <form id="single-item-search" onSubmit={props.handleSingleItemQuery}>
          <input
            name="singleItemInput"
            value={props.singleItemInput}
            onChange={props.handleSingleItemInputChange}
            placeholder="..."
          />
        </form>

        {searchResults && listFoods(props, searchResults)}

      </main>
      <footer>
        <div>
          basket: {props.basket.length}
        </div>
        <button
          onClick={props.logBasket}
          className="log-button"
        >Add</button>
      </footer>
    </div>
  )
}
