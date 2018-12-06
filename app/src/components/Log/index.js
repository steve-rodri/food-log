import React from 'react';
import Meal from './components/Meal';
import Food from '../Food';
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
            handleMealSelect={(e) => {
              e.stopPropagation();
              this.props.handleMealSelect(meal, 'Log', id)
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
        {this.props.log.misc.map( (food, id) =>
          <Food
            food={food}
            key={id}
            appView={this.props.currentView}
            onSelectFood={(e) => {
              this.props.handleFoodSelect(food, 'Log', id);
            }}
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

  editModeStyle(){
    if (this.state.editMode) {
      return {
        backgroundColor: 'blue'
      }
    }
  }

  render(){
    return (
      <div className="Page" id="log-page">
        <header id="log-header" style={this.editModeStyle()}>
          <h1 id="title">Log</h1>
          <button className="edit-button" onClick={this.toggleEdit}>{this.state.editMode? 'Done' : 'Edit'}</button>
        </header>
        <main>
          {this.props.log.meals.length > 0 && this.renderMeals()}
          {this.props.log.misc.length > 0 && this.renderMisc()}
        </main>
        <footer style={this.editModeStyle()}>
          {!this.state.editMode && <button
          onClick={() => this.props.handleViewChange('Add Food')}
          id="add-food-button"
          >Add</button>}
        </footer>
      </div>
    )
  }
}
