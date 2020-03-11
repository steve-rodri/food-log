import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

const AddButton = ({ onAdd }) => {
  return <Button title="Add" onPress={onAdd} type="outline" />;
};

AddButton.propTypes = {
  onAdd: PropTypes.func
};

export default AddButton;
