import React from "react";
import { useDispatch } from "react-redux";
import { redux } from "@fl/common";
import { Button } from "react-native";
import PropTypes from "prop-types";

const {
  actions: { setView }
} = redux;

const SearchButton = () => {
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.stopPropagation();
    dispatch(setView("SingleItem"));
  };
  return <Button title="Search" type="outline" onPress={onSubmit} raised />;
};

SearchButton.propTypes = {
  onSubmit: PropTypes.func,
  query: PropTypes.string
};

export default SearchButton;
