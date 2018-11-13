import React from 'react';
import Meal from './components/Meal';
import Misc from './components/Misc';
import './style.css'

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
          />
        )}
      </div>
    )
  }

  render(){
    return (
      <div>
        <header>
          <h1>Log</h1>
          <button>Targets</button>
        </header>

        {this.state.meals.length > 0 && this.renderMeals()}

        {this.state.misc.length > 0 && this.renderMisc()}

        <footer>
          <button
          onClick={this.props.handleViewChange}
          >AddFood</button>
        </footer>
      </div>
    )
  }
}
