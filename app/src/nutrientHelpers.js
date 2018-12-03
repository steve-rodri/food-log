import data from './nutrient-conversion-table';


function getSumOfNutrientFromFood(food, nutrientName){
  if (Array.isArray(food)) {
    const nutrientValues = food.map(ingredient => {
      const nutrientValue = nutrientOfFood(ingredient, findIdOfNutrient(nutrientName))
        .value;
      return nutrientValue;
    });
    const sum = nutrientValues.reduce((a, b) => a + b);
    const total = Math.round(sum, 1);
    return total;
  } else {
    const nutrientValue = nutrientOfFood(food, findIdOfNutrient(nutrientName))
      .value;
    return Math.round(nutrientValue, 1);
  }
}

function nutrientOfFood(food, id) {
  const nutrient = food.full_nutrients.filter(
    nutrient => nutrient.attr_id === id
  );
  return nutrient[0];
}

function findIdOfNutrient(name) {
  const nutrient = data.filter(nutrient => nutrient.name === name);
  return nutrient[0].attr_id;
}


export {
  getSumOfNutrientFromFood
}
