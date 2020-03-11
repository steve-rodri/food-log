import React, { useState } from "react";
import {
  Screen,
  Buttons,
  InputField,
  Greeting,
  SearchButton,
  LogButton
} from "../components";
import { useDispatch } from "react-redux";
import { redux } from "@fl/common";

const {
  actions: { setView },
  queries: { naturalLanguage }
} = redux;

const NatLang = () => {
  const [query, setInputField] = useState("");
  const dispatch = useDispatch();
  const handleChange = e => setInputField(e.target.value);
  const handleSubmit = async e => {
    e.preventDefault();
    if (query.length) naturalLanguage(query);
    else dispatch(setView("Log"));
  };

  return (
    <Screen
      header={Greeting}
      main={
        <InputField value={query} onSubmit={handleSubmit} onChange={handleChange} />
      }
      footer={
        <Buttons>
          <SearchButton />
          <LogButton onSubmit={handleSubmit} query={query} />
        </Buttons>
      }
    />
  );
};

export default NatLang;
