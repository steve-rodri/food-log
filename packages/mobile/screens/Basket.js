import React from "react";
import { View, Text, FlatList } from "react-native";
import {
  Screen,
  Buttons,
  BackButton,
  LogButton,
  EmptyButton,
  Food
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";

const {
  actions: {
    deleteBasketItem,
    resetBasket,
    addBasketToLog,
    setView,
    handleSelect,
    clearResults
  }
} = redux;

const Basket = () => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!basket.contents.length) dispatch(setView("Log"));
    if (basket.contents.length > 1) dispatch(setView("AddMealTitle"));
    else {
      dispatch(addBasketToLog());
      dispatch(resetBasket());
      dispatch(clearResults());
      dispatch(setView("Log"));
    }
  };
  const handleEmpty = () => dispatch(resetBasket());
  return (
    <Screen
      header={
        <View>
          <Text>Selected</Text>
          <EmptyButton onEmpty={handleEmpty} />
        </View>
      }
      main={
        <View>
          <RenderItems />
        </View>
      }
      footer={
        <View>
          <Buttons>
            <BackButton />
            <LogButton onSubmit={handleSubmit} />
          </Buttons>
        </View>
      }
    />
  );
};

const RenderItems = () => {
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket);
  if (!basket.contents.length) dispatch(setView("SingleItem"));
  return (
    <FlatList
      data={basket.contents}
      renderItem={({ item, index }) => (
        <Food
          food={item}
          onSelect={() => dispatch(handleSelect(item, index))}
          onDelete={() => dispatch(deleteBasketItem(index))}
          editMode={true}
        />
      )}
    />
  );
};

export default Basket;
