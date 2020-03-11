import React, { useEffect } from "react";
import Basket from "./screens/Basket";
import SingleItem from "./screens/SingleItem";
import NatLang from "./screens/NatLang";
import AddMealTitle from "./screens/AddMealTitle";
import Log from "./screens/Log";
import ExpandedMeal from "./screens/ExpandedMeal";
import Login from "./screens/Login";
import { useSelector, useDispatch } from "react-redux";
import { redux, services } from "@fl/common";

const App = () => {
  const view = useSelector(state => state.view.current);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(redux.actions.setTheme("dark"));
    return;
  }, [dispatch]);
  const render = () => {
    switch (view) {
      case "Basket":
        return <Basket />;
      case "SingleItem":
        return <SingleItem />;
      case "NatLang":
        return <NatLang />;
      case "AddMealTitle":
        return <AddMealTitle />;
      case "Log":
        return <Log />;
      case "ExpandedMeal":
        return <ExpandedMeal />;
      case "Login":
        return <Login />;
      default:
        return null;
    }
  };
  const authorize = () => {
    const authorizeUser = async () =>
      await services.google.fetchUser({ native: true });
    authorizeUser();
  };
  useEffect(() => authorize(), []);
  return render();
};

export default App;
