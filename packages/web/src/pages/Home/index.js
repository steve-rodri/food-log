import React, { useEffect } from "react";
import Login from "../Login";
import Log from "../Log";
import ExpandedMeal from "../ExpandedMeal";
import NatLang from "../NatLang";
import SingleItem from "../SingleItem";
import AddMealTitle from "../AddMealTitle";
import Basket from "../Basket";
import { useSelector } from "react-redux";
import { services } from "@fl/common";
import "../../css/buttons.module.css";

const Home = () => {
  const view = useSelector(state => state.view.current);
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
    const authorizeUser = async () => await services.fetchUser();
    authorizeUser();
  };
  useEffect(() => authorize(), []);
  return render();
};

export default Home;
