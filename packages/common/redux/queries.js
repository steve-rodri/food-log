import * as redux from "../redux";
import {
  getNatLangFoodResults,
  getSingleItemResults
} from "../services/nutritionix";
const {
  store,
  actions: {
    addItemsToBasket,
    addItemsToLog,
    setView,
    setResults,
    clearResults
  }
} = redux;

export async function naturalLanguage(query) {
  const { dispatch } = store;
  try {
    const data = await getNatLangFoodResults(query);
    if (data.length > 1) {
      dispatch(addItemsToBasket(data));
      dispatch(setView("AddMealTitle"));
    } else {
      dispatch(addItemsToLog(data));
      dispatch(setView("Log"));
    }
  } catch (e) {
    return e;
  }
}

export async function singleItem(query) {
  const { dispatch } = store;
  if (query.length > 2) {
    try {
      const results = await getSingleItemResults(query);
      dispatch(setResults(results));
    } catch (e) {}
  } else {
    dispatch(clearResults());
  }
}
