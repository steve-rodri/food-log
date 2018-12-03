import React from 'react';
import './style.css';
import data from '../../../../NutrientConversion';

export default function Meal(props){
  return (
    <div className='meal' onClick={props.handleMealSelect}>
      <div className='meal-image'></div>
        <div className='meal-contents'>
          <h4 className='meal-title'>{props.meal.mealTitleInput}</h4>
          <div className="ingredients">
            {props.meal.contents.map( (food, id) =>
              <h6 key={id} className="ingredient" >{food.serving_qty} {food.serving_unit} {food.food_name}</h6>
            )}
          </div>
        </div>

      {props.editMode && renderDeleteButton(props)}
      {!props.editMode && renderMetrics(props)}
    </div>
  )
}

function renderMetrics(props) {
  const calories = getCalories(props);
  const protein = getProtein(props);
  const carbs = getCarbs(props);
  const fat = getFat(props);

  return (
    <div className='metrics'>
      <div className='total-calories'>
        {calories}
      </div>
      <div className='macronutrients'>
        <div className='protein-label'>P:</div>
        <div className='protein-value'>{protein}</div>
        <div className='carbs-label'>C:</div>
        <div className='carbs-value'>{carbs}</div>
        <div className='fat-label'>F:</div>
        <div className='fat-value'>{fat}</div>
      </div>
    </div>
  )
}

function getCalories(props){
  const { meal:{ contents } } = props
  const nutrientValues = contents.map( ingredient => {

    const calories = nutrientOfFood(ingredient, findIdOfNutrient('Calories')).value;
    return calories;

  });
  const sum = nutrientValues.reduce((a, b) => a + b);
  const totalCalories = Math.round(sum, 1);
  return totalCalories;
}

function getProtein(props){
  const { meal:{ contents } } = props
  const nutrientValues = contents.map( ingredient => {

    const protein = nutrientOfFood(ingredient, findIdOfNutrient('Protein')).value;
    return protein;

  });
  const sum = nutrientValues.reduce((a, b) => a + b);
  const totalProtein = Math.round(sum, 1);
  return totalProtein;
}

function getCarbs(props){
  const { meal:{ contents } } = props
  const nutrientValues = contents.map( ingredient => {

    const carbs = nutrientOfFood(ingredient, findIdOfNutrient('Carbohydrate')).value;
    return carbs;

  });
  const sum = nutrientValues.reduce((a, b) => a + b);
  const totalCarbs = Math.round(sum, 1);
  return totalCarbs;
}

function getFat(props){
    const { meal:{ contents } } = props
    const nutrientValues = contents.map( ingredient => {

      const fat = nutrientOfFood(ingredient, findIdOfNutrient('Total lipid (fat)')).value;
      return fat;

    });
    const sum = nutrientValues.reduce((a, b) => a + b);
    const totalFat = Math.round(sum, 1);
    return totalFat;
}

function nutrientOfFood(food, id){
  const nutrient = food.full_nutrients.filter(nutrient => nutrient.attr_id === id);
  return nutrient[0];
}

function findIdOfNutrient(name){
  const nutrient = data.filter(nutrient => nutrient.name === name);
  return nutrient[0].attr_id;
}



function renderDeleteButton(props){
  return(

      <button
        className="delete-button"
        onClick={props.handleDelete}
      >Delete</button>

  )
}
