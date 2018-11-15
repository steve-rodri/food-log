import React from 'react';
import Meal from './components/Meal';
import Misc from './components/Misc';
import './style.css';

// props

// log
// handleViewChange
// handleFoodSelect


export default class Log extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      meals: props.log.meals,
      misc: props.log.misc
    }
  }

  renderMeals(){
    return (
      <div className="meals">
        {this.state.meals.map( meal =>
          <Meal
            meal={meal}
            onSelectFood={this.props.handleFoodSelect}
          />
        )}
      </div>
    )
  }

  renderMisc(){
    return (
      <div className="misc-items">
        {this.state.misc.map( misc =>
          <Misc
            misc={misc}
            onSelectFood={this.props.handleFoodSelect}
          />
        )}
      </div>
    )
  }

  render(){
    return (
      <div className="Page" id="log-page">
        <header>
          <h1 id="title">Log</h1>
          <button id="targets" onClick={() => this.props.handleViewChange('Targets')}>Targets</button>
        </header>
        <main>
          {this.state.meals.length > 0 && this.renderMeals()}

          {this.state.misc.length > 0 && this.renderMisc()}
        </main>
        <footer>
          <button
          onClick={() => this.props.handleViewChange('Add Food')}
          id="add-food-button"
          >Add Food</button>
        </footer>
      </div>
    )
  }
}
