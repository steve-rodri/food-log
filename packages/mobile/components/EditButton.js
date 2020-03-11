import React from "react";
import { Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const EditButton = ({ editMode, toggleEdit }) => {
  return (
    <Button
      style={editMode ? styles.editMode : styles.normal}
      onPress={toggleEdit}
      title={editMode ? "Done" : "Edit"}
    />
  );
};

EditButton.propTypes = {
  editMode: PropTypes.bool,
  toggleEdit: PropTypes.func
};

const styles = StyleSheet.create({
  editMode: {},
  normal: {}
});
