import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

const EmptyButton = ({ onEmpty }) => {
  return <Button title="Empty" onPress={onEmpty} />;
};

EmptyButton.propTypes = {
  onEmpty: PropTypes.func
};
