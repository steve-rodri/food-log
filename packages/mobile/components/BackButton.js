import React from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import { redux } from "@fl/common";

const BackButton = () => {
  const dispatch = useDispatch();
  const {
    actions: { setPrevious }
  } = redux;
  return (
    <Button
      title="Back"
      onPress={() => dispatch(setPrevious())}
      type="outline"
    />
  );
};

export default BackButton;
