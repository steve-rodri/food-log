import store from './store'
import { getNatLangFoodResults } from '../services/nutritionix'
import { addItemsToBasket, addItemsToLog, setView } from '../redux'

export async function handleNatLangQuery(query) {
  const { dispatch } = store
  try {
    const data = await getNatLangFoodResults(query)
    if (data.length > 1) {
      dispatch(addItemsToBasket(data))
      dispatch(setView("AddMealTitle"))
    } else {
      dispatch(addItemsToLog(data))
      dispatch(setView("Log"))
    }
  } catch (e) {
    return e
  }
}
