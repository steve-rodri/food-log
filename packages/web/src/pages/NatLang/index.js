import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redux, helpers } from "@fl/common";
import "./style.css";
import buttonstyles from "../../css/buttons.module.css";

const {
  actions: { setView },
  queries: { naturalLanguage }
} = redux;

const NatLang = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    if (query.length) naturalLanguage(query);
    else dispatch(setView("Log"));
  };

  const handleChange = e => setQuery(e.target.value);

  return (
    <div className="Page NatLang">
      <header>
        <Greeting />
      </header>

      <main>
        <Query query={query} onChange={handleChange} onSubmit={handleSubmit} />
      </main>

      <footer>
        <div className="Buttons">
          <SearchButton />
          <LogButton onSubmit={handleSubmit} query={query} />
        </div>
      </footer>
    </div>
  );
};

const Greeting = () => {
  const user = useSelector(state => state.user);
  const {
    data: { givenName }
  } = user;
  return (
    <div className="NatLang-Greeting">
      {givenName ? (
        <h2>{`Good ${helpers.timeOfDay()} ${givenName},`}</h2>
      ) : null}
      <h2>What's for {helpers.getMealTypebyTime()}?</h2>
    </div>
  );
};

const Query = ({ value, onSubmit, onChange }) => {
  const queryRef = useRef();
  useEffect(() => queryRef.current.focus(), []);
  return (
    <form onSubmit={onSubmit}>
      <textarea
        ref={queryRef}
        value={value}
        onChange={onChange}
        placeholder={`Try typing something like...\n\n"I had 1 sweet potato with half of an avocado and a cup of black beans"\n\nYou could even input a whole recipe...`}
      ></textarea>
    </form>
  );
};

const LogButton = ({ onSubmit, query }) => {
  const style = () => (query.length ? buttonstyles.greenhighlight : null);
  return (
    <button onClick={onSubmit} className={style()}>
      Log
    </button>
  );
};

const SearchButton = () => {
  const dispatch = useDispatch();
  const onClick = e => {
    e.stopPropagation();
    dispatch(setView("SingleItem"));
  };
  return (
    <button className="Nav-Button" onClick={onClick}>
      Search
    </button>
  );
};

export default NatLang;
