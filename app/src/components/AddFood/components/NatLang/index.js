import React from 'react';
import './style.css';

//props
// userName
// mealType
//
// natLangInput
// handleNatLangInputChange
// handleNatLangQuery

export default function NatLang(props){
  return (
    <div className="Page" id="nat-lang-search-page">
      <header id="greeting">
        <h1>Hey {props.userName},</h1>
        <h1>What's for {props.mealType}?</h1>
        <button id="single-item" onClick={() => props.handleViewChange("Single Item")}>Search</button>
      </header>
      <main>
        <form id="nat-lang-search" onSubmit={props.handleNatLangQuery}>
          <textarea
            name="natLangInput"
            value={props.natLangInput}
            onChange={props.handleNatLangInputChange}
            placeholder={`Try typing something like...\n\n"I had 1 sweet potato and a cup of black beans" \n\n You could even input a whole recipe...`}
          >
          </textarea>
        </form>
      </main>
      <footer>
        <button
          onClick={props.handleNatLangQuery}
          id="log-button"
        >Add</button>
      </footer>
    </div>
  )
}
