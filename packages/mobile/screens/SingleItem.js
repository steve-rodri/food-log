import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, SectionList } from "react-native";
import {
  Screen,
  Buttons,
  LogButton,
  BackButton,
  BasketButton,
  InputField,
  Food
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";

const {
  actions: {
    setView,
    addBasketToLog,
    addBasketItem,
    resetBasket,
    clearResults
  },
  queries: { singleItem }
} = redux;

const SingleItem = props => {
  const [searchField, setSearchField] = useState("");
  const results = useSelector(state => state.searchResults);
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const handleChange = async e => {
    const { value } = e.target;
    setSearchField(value);
    singleItem(value);
  };
  const handleSelect = food => dispatch(addBasketItem(food));
  const handleSubmit = async e => {
    e.preventDefault();
    singleItem(searchField);
  };
  const handleLog = () => {
    if (!basket.contents.length) dispatch(setView("Log"));
    if (basket.contents.length > 1) dispatch(setView("AddMealTitle"));
    else {
      dispatch(addBasketToLog());
      dispatch(resetBasket());
      dispatch(clearResults());
      dispatch(setView("Log"));
    }
  };

  return (
    <Screen
      header={
        <View>
          <Text>Search</Text>
          <BasketButton />
        </View>
      }
      main={
        <Main
          queryValue={searchField}
          results={results}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onSelect={handleSelect}
        />
      }
      footer={
        <Buttons>
          <BackButton />
          <LogButton
            onSubmit={handleLog}
            title={basket.contents.length > 1 ? "Log Meal" : null}
            active={basket.contents.length > 1}
          />
        </Buttons>
      }
    />
  );
};

const Main = ({ queryValue, results, onChange, onSubmit, onSelect }) => {
  return (
    <View>
      <SearchResults results={results} onSelect={onSelect} />
      <InputField
        value={queryValue}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder={"search..."}
      />
    </View>
  );
};

const SearchResults = ({ results, onSelect }) => {
  if (!results) return null;
  const sections = () => {
    const list = [];
    if (results.common.length)
      list.push({ title: "Common", data: results.common });
    if (results.branded.length)
      list.push({ title: "Branded", data: results.branded });
    return list;
  };
  return (
    <SectionList
      sections={sections()}
      renderItem={({ item }) => (
        <Food food={item} onSelect={() => onSelect(item)} />
      )}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      keyExtractor={(item, index) => index}
    />
  );
};

Main.propTypes = {
  queryValue: PropTypes.string,
  results: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onSelect: PropTypes.func
};

SearchResults.propTypes = {
  results: PropTypes.object.isRequired,
  onSelect: PropTypes.func
};

export default SingleItem;
