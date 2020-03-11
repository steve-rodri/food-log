import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput } from "react-native";
import { Screen, Buttons, BackButton, EditButton, Food } from "../components";
import { redux } from "@fl/common";

const {
  actions: { deleteLogMealItem, editSelection, editLogItem }
} = redux;

const ExpandedMeal = () => {
  const meal = useSelector(state => state.selection);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => setEditMode(!editMode);

  const handleChange = e => {
    meal.title = e.target.value;
    dispatch(editSelection(meal));
  };

  useEffect(() => {
    if (!editMode) dispatch(editLogItem(meal.id, meal));
    if (editMode) inputRef.current.select();
  }, [editMode, dispatch, meal]);

  return (
    <Screen
      header={
        <View>
          {editMode ? (
            <TextInput
              ref={inputRef}
              value={meal.title}
              onChange={handleChange}
              onFocus={() => inputRef.current.select()}
            />
          ) : (
            <Text>{meal.title}</Text>
          )}
        </View>
      }
      main={
        <View>
          <RenderMealContents editMode={editMode} />
        </View>
      }
      footer={
        <View>
          <Buttons>
            <BackButton />
            <EditButton editMode={editMode} toggleEdit={toggleEdit} />
          </Buttons>
        </View>
      }
    />
  );
};

const RenderMealContents = ({ editMode }) => {
  const meal = useSelector(state => state.selection);
  const dispatch = useDispatch();
  return meal.contents.map((food, id) => (
    <Food
      food={food}
      key={id}
      editMode={editMode}
      onDelete={e => {
        e.stopPropagation();
        dispatch(deleteLogMealItem(id));
      }}
      onSelect={e => {
        e.stopPropagation();
        // dispatch(handleSelect(food))
      }}
    />
  ));
};

export default ExpandedMeal;
