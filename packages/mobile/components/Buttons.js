import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Buttons = ({ children, style = {} }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

Buttons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 7.5,
    paddingBottom: 7.5,
    justifyContent: "center"
  }
});

export default Buttons;
