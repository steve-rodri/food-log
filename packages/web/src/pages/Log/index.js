import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";
import Meal from "../../components/Meal";
import Food from "../../components/Food";
import "./style.css";

const {
  actions: { setView, deleteLogItem, handleSelect }
} = redux;

const Log = () => {
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => setEditMode(!editMode);

  return (
    <div className="Page Log">
      <header>
        <h1>Log</h1>
      </header>

      <main>
        <RenderItems editMode={editMode} />
      </main>

      <footer>
        <div className="Buttons">
          <AddButton editMode={editMode} />
          <EditButton editMode={editMode} toggleEdit={toggleEdit} />
        </div>
      </footer>
    </div>
  );
};

const RenderItems = ({ editMode }) => {
  const log = useSelector(state => state.log);
  const dispatch = useDispatch();

  if (!log.length) return null;
  return log.map((item, id) => {
    if (item.contents)
      return (
        <Meal
          meal={item}
          key={id}
          editMode={editMode}
          onDelete={e => {
            e.stopPropagation();
            dispatch(deleteLogItem(id));
          }}
          onSelect={e => {
            e.stopPropagation();
            dispatch(handleSelect(item, id));
          }}
        />
      );
    else
      return (
        <Food
          food={item}
          key={id}
          editMode={editMode}
          onDelete={e => {
            e.stopPropagation();
            dispatch(deleteLogItem(id));
          }}
          onSelect={e => {
            e.stopPropagation();
            dispatch(handleSelect(item, id));
          }}
        />
      );
  });
};

const EditButton = ({ editMode, toggleEdit }) => {
  const style = () => {
    if (editMode)
      return {
        borderColor: "var(--edit-mode-color)",
        color: "var(--edit-mode-color)"
      };
    return {};
  };
  return (
    <button style={style()} onClick={toggleEdit}>
      {editMode ? "Done" : "Edit"}
    </button>
  );
};

const AddButton = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(setView("NatLang"))} className="Add-Button">
      Add
    </button>
  );
};

export default Log;
