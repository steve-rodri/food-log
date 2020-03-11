import React from "react";
import { Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";

const BasketButton = () => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();
  if (!basket.contents.length) return null;
  const {
    actions: { setView }
  } = redux;
  return (
    <Button
      onPress={() => dispatch(setView("Basket"))}
      title={`Selected: ${basket.contents.length}`}
    />
  );
};

export default BasketButton;
