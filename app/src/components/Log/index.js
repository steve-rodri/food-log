import React from 'react';
import Meal from './components/Meal';
import Misc from './components/Misc';
import './style.css';

export default class Log extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editMode: false,
    }
  }

  toggleEdit = () => {
    const toggle = this.state.editMode;
    this.setState({
      editMode: !toggle
    })
  }

  handleMiscSelect = (food) => {
    this.props.handleSelect(food, "Misc", "Log")
  }

  handleMealSelect = (meal) => {
    this.props.handleSelect(meal, "Meal", "Log")
  }
  renderMeals(){
    return (
      <div className="meals">
        {this.props.log.meals.map( (meal, id) =>
          <Meal
            key={id}
            meal={meal}
            handleMealSelect={(e) => {
              this.handleMealSelect(meal)
            }}
            editMode={this.state.editMode}
            handleDelete={(e) => {
              e.stopPropagation();
              this.props.onDelete(id, "meal");
            }}
          />
        )}
      </div>
    )
  }

  renderMisc(){
    return (
      <div className="misc-items">
        {this.props.log.misc.map( (misc, id) =>
          <Misc
            key={id}
            misc={misc}
            onSelectFood={this.handleMiscSelect}
            editMode={this.state.editMode}
            handleDelete={(e) => {
              e.stopPropagation();
              this.props.onDelete(id, "misc");
            }}
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
          <button className="edit-button" onClick={this.toggleEdit}>Edit</button>
        </header>
        <main>
          {this.props.log.meals.length > 0 && this.renderMeals()}
          {this.props.log.misc.length > 0 && this.renderMisc()}
        </main>
        <footer>
          <button
          onClick={() => this.props.handleViewChange('Add Food')}
          id="add-food-button"
          >Add</button>
        </footer>
      </div>
    )
  }
}
