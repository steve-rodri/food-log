import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import {
  Screen,
  Buttons,
  SkipButton,
  AddButton,
  InputField
} from "../components";
import { redux } from "@fl/common";

const {
  actions: { editBasket, addBasketToLog, resetBasket, setView }
} = redux;

const AddMealTitle = () => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const handleChange = e => {
    basket.title = e.target.value;
    dispatch(editBasket(basket));
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBasketToLog());
    dispatch(resetBasket());
    dispatch(setView("Log"));
  };

  return (
    <Screen
      main={
        <View>
          <InputField
            label={"Make this a meal by giving it a title:"}
            value={basket.title}
            onChange={handleChange}
          />
        </View>
      }
      footer={
        <View>
          <Buttons>
            <SkipButton onSubmit={handleSubmit} />
            <AddButton onSubmit={handleSubmit} active={basket.title} />
          </Buttons>
        </View>
      }
    />
  );
};

export default AddMealTitle;
