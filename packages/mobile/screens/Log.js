import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, FlatList } from "react-native";
import {
  Screen,
  Buttons,
  EditButton,
  AddButton,
  Food,
  Meal
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";

const {
  actions: { setView, deleteLogItem, handleSelect }
} = redux;

const Log = () => {
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => setEditMode(!editMode);
  const dispatch = useDispatch();
  return (
    <Screen
      header={<Text>Log</Text>}
      main={<RenderItems editMode={editMode} />}
      footer={
        <Buttons>
          <AddButton onAdd={() => dispatch(setView("NatLang"))} />
          <EditButton editMode={editMode} toggleEdit={toggleEdit} />
        </Buttons>
      }
    />
  );
};

const RenderItems = ({ editMode }) => {
  const log = useSelector(state => state.log);
  const dispatch = useDispatch();
  if (!log.length) return null;

  return (
    <FlatList
      data={log}
      renderItem={({ item, index }) => {
        if (item.contents)
          return (
            <Meal
              meal={item}
              editMode={editMode}
              onDelete={e => {
                e.stopPropagation();
                dispatch(deleteLogItem(index));
              }}
              onSelect={e => {
                e.stopPropagation();
                dispatch(handleSelect(item, index));
              }}
            />
          );
        else
          return (
            <Food
              food={item}
              editMode={editMode}
              onDelete={e => {
                e.stopPropagation();
                dispatch(deleteLogItem(index));
              }}
              onSelect={e => {
                e.stopPropagation();
                dispatch(handleSelect(item, index));
              }}
            />
          );
      }}
    />
  );
};

RenderItems.propTypes = {
  editMode: PropTypes.bool
};

export default Log;
