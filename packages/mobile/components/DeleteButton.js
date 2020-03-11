import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete }) => (
  <Button title="Delete" onPress={onDelete} />
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func
};

export default DeleteButton;
