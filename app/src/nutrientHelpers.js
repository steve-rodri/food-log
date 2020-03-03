import nutrientData from './nutrient-conversion-table';


export function getSumOfNutrientFromFood(food, name){
  if (Array.isArray(food)) {
    const nutrientValues = food.map(i => {
      return nutrientOfFood(i, findIdOfNutrient(name)).value;
    });
    const sum = nutrientValues.reduce((a, b) => a + b);
    return Math.round(sum, 1);
  } else {
    const nutrient = nutrientOfFood(food, findIdOfNutrient(name));
    if (!nutrient) return 0
    if (nutrient.value > 0 && nutrient.value < 1) return nutrient.value.toFixed(2);
    return Math.round(nutrient.value, 1);
  }
}

function nutrientOfFood(food, id) {
  if (!food || !food.fullNutrients) return;
  const nutrient = food.fullNutrients.filter(
    nutrient => nutrient.attrId === id
  );
  return nutrient[0];
}

function findIdOfNutrient(name) {
  const nutrient = nutrientData.filter(nutrient => nutrient.name === name);
  return nutrient[0].attrId;
}
