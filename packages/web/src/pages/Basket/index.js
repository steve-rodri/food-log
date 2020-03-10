import React from "react";
import Food from "../../components/Food";
import { useSelector, useDispatch } from "react-redux";
import { redux } from "@fl/common";
import "./style.css";
import buttonStyles from "../../css/buttons.module.css";

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
  return (
    <div className="Page Basket">
      <header>
        <h1>Selected</h1>
        <EmptyButton />
      </header>

      <main>
        <RenderItems />
      </main>

      <footer>
        <div className="Buttons">
          <BackButton />
          <LogButton onSubmit={handleSubmit} />
        </div>
      </footer>
    </div>
  );
};

const RenderItems = () => {
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket);
  if (!basket.contents.length) dispatch(setView("SingleItem"));
  return basket.contents.map((food, id) => (
    <Food
      food={food}
      key={id}
      onSelect={() => dispatch(handleSelect(food, id))}
      onDelete={() => dispatch(deleteBasketItem(id))}
      editMode={true}
    />
  ));
};

const EmptyButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="Basket-Empty delete-button"
      onClick={() => dispatch(resetBasket())}
    >
      Empty
    </button>
  );
};

const BackButton = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(setView("SingleItem"))}>Back</button>;
};

const LogButton = ({ onSubmit }) => {
  const basket = useSelector(state => state.basket);
  return (
    <button className={buttonStyles.greenhighlight} onClick={onSubmit}>
      {basket.contents.length > 1 ? "Log Meal" : "Log"}
    </button>
  );
};

export default Basket;
