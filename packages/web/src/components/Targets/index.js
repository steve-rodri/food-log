import React from 'react';
import './style.css';

//props

//log

export default class Targets extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      calorieTarget:2500,
      calorieLevel:0
    }
  }


  currentLevel(){
    const calorieLevel = this.totalCalories();
    const calorieTarget = this.state.calorieTarget;

    return(calorieLevel / calorieTarget * .8 * 100);
  }


  renderCalorieMeter(){
    return(
    <div id="container">
      <h4>Calories</h4>
        <div id="calorie-meter">
          <div id="calorie-target">
            <div id= "calorie-level" style={{width: `${this.currentLevel()}%`}}>
              <p id="calorie-number">{this.totalCalories()+"/"+this.state.calorieTarget}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  totalCalories(){
    const meals = [...this.props.log.meals];

    const mealFoods = meals.map(meal => meal.food);
    const foods = mealFoods[0];
    const calories = foods.map( food => food.nf_calories);
    
    const sum = calories.reduce((total, amount) => total + amount);

    return (Math.round(sum));
  }

  render(){
    return(
      <div className="Page" id="targets-page">
        <header>
          <h1 id="title">Targets</h1>
        </header>
        <main>
          {this.renderCalorieMeter()}
        </main>
        <footer>
          <button
            className="back-button"
            onClick={() => this.props.handleViewChange("Log")}
          >
            Back
          </button>
        </footer>
      </div>
    )
  }
}
