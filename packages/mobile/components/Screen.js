import React from "react";
import { StyleSheet } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { themes } from "@fl/common";

const Screen = ({ header, main, footer }) => {
  const styles = useStyles();
  return (
    <Grid style={styles.page}>
      {header ? <Row style={styles.header}>{header}</Row> : null}
      <Row style={styles.main}>{main}</Row>
      {footer ? <Row style={styles.footer}>{footer}</Row> : null}
    </Grid>
  );
};

const useStyles = () => {
  const current = useSelector(state => state.theme);
  return StyleSheet.create({
    page: {
      backgroundColor: themes[current].backgroundColor
    },
    header: {
      height: 100
    },
    main: {
      flexDirection: "column",
      justifyContent: "center"
    },
    footer: {
      height: 100
    }
  });
};

Screen.propTypes = {
  main: PropTypes.element.isRequired,
  header: PropTypes.element,
  footer: PropTypes.element
};

export default Screen;
