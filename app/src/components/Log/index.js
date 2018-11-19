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

  renderMeals(){
    return (
      <div className="meals">
        {this.props.log.meals.map( (meal, id) =>
          <Meal
            key={id}
            meal={meal}
            onSelectFood={this.props.handleFoodSelect}
            editMode={this.state.editMode}
            handleDelete={() => this.props.onDelete(id, "meal", "Log")}
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
            onSelectFood={this.props.handleFoodSelect}
            editMode={this.state.editMode}
            handleDelete={(e) => {
              e.stopPropagation();
              this.props.onDelete(id, "misc", "Log")
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
