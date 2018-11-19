import React from 'react';
import './style.css';

export default function NatLang(props){
  return (
    <div className="Page" id="nat-lang-search-page">
      <header>
        <div id="greeting" >
          <h1>Hey {props.userName},</h1>
          <h1>What's for {props.mealType}?</h1>
        </div>
      </header>
      <main id="nat-lang-main">
        <form id="nat-lang-search" onSubmit={props.handleNatLangQuery}>
          <textarea
            name="natLangInput"
            value={props.natLangInput}
            onChange={props.handleNatLangInputChange}
            placeholder={`Try typing something like..."I had 1 sweet potato with half of an avocado and a cup of black beans" \n\n You could even input a whole recipe...`}
          >
          </textarea>
        </form>
      </main>
      <footer>
        <button
          onClick={props.handleNatLangQuery}
          className="log-button"
        >Log</button>
        <button
          id="single-item"
          onClick={() => props.handleViewChange("Single Item")}
        >Search</button>
      </footer>
    </div>
  )
}
