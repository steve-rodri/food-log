import React from 'react';
import './style.css';

//props
// singleItemInput
// handleSingleItemInputChange
// handleSingleItemQuery

export default function SingleItem(props){
  return (
    <div className="Page" id="single-item-search-page">
      <header>
        <h1>Search</h1>
      </header>
      <main id="single-item-search">
        <input
          name="singleItemInput"
          value={props.singleItemInput}
          onChange={props.handleSingleItemInputChange}//
          placeholder="..."
        >
        </input>
      </main>
      <footer>
        <button
          onClick={props.handleSingleItemQuery}//
          className="log-button"
        >Add</button>
      </footer>
    </div>
  )
}
