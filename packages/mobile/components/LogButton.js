import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

const LogButton = ({ onSubmit, active, title }) => {
  if (active) return <Button title={title} onPress={onSubmit} raised />;
  else return <Button title={title} onPress={onSubmit} raised type="outline" />;
};

LogButton.defaultProps = {
  title: "Log"
};

LogButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  active: PropTypes.bool,
  title: PropTypes.string
};

export default LogButton;
