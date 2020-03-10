import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";
import Food from "../../components/Food";
import "./style.css";
import buttonStyles from "../../css/buttons.module.css";

const {
  actions: { deleteLogMealItem, setView, editSelection, editLogItem }
} = redux;

const ExpandedMeal = props => {
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
    <div className="Page ExpandedMeal">
      <header>
        {editMode ? (
          <input
            ref={inputRef}
            value={meal.title}
            onChange={handleChange}
            onFocus={() => inputRef.current.select()}
          />
        ) : (
          <h1>{meal.title}</h1>
        )}
      </header>

      <main>
        <RenderMealContents editMode={editMode} />
      </main>

      <footer>
        <div className="Buttons">
          <BackButton editMode={editMode} setEditMode={setEditMode} />
          <EditButton onEdit={toggleEdit} editMode={editMode} />
        </div>
      </footer>
    </div>
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

const EditButton = ({ onEdit, editMode }) => {
  return (
    <button
      onClick={onEdit}
      className={!editMode ? null : buttonStyles.greenhighlight}
    >
      {editMode ? "Done" : "Edit"}
    </button>
  );
};

const BackButton = ({ editMode, setEditMode }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        if (editMode) setEditMode(false);
        else dispatch(setView("Log"));
      }}
    >
      Back
    </button>
  );
};

export default ExpandedMeal;
