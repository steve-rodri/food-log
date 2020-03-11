import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

const SkipButton = ({ onSubmit }) => {
  return <Button title="Skip" onPress={onSubmit} />;
};

SkipButton.propTypes = {
  onSubmit: PropTypes.func
};

export default SkipButton;
