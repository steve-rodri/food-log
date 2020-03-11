import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { themes } from "@fl/common";

const InputField = ({ label, ...props }) => {
  const [borderColor, setBorderColor] = useState("rgb(144, 144, 144)");
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...props}
        style={{ ...props.style, ...styles.textInput, borderColor }}
        keyboardAppearance="dark"
        onFocus={() => setBorderColor("rgb(245, 245, 245)")}
        onBlur={() => setBorderColor("rgb(144, 144, 144)")}
        placeholderTextColor={"rgb(144, 144, 144)"}
      />
    </View>
  );
};

InputField.defaultProps = {
  value: "",
  placeholder: "",
  multiline: false,
  keyboardType: "default",
  textContentType: "none"
};

InputField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object
};

const useStyles = () => {
  const theme = useSelector(state => state.theme);

  return StyleSheet.create({
    container: {},
    textInput: {
      borderStyle: "solid",
      borderBottomWidth: 2,
      height: 65,
      fontSize: 22,
      paddingLeft: 15,
      paddingRight: 15,
      color: themes[theme].defaultTextColor
    },
    label: {
      color: themes[theme].defaultTextColor,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 16
    }
  });
};

export default InputField;
