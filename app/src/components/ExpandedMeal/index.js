import React from 'react';
import Food from '../Food';
import './styles.css';

export default class ExpandedMeal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false
    }
  }

  toggleEdit = () => {
    const toggle = this.state.editMode;
    this.setState({
      editMode: !toggle
    })
  }

  editModeStyle(){
    if (this.state.editMode) {
      return {
        backgroundColor: 'blue'
      }
    }
  }

  render(){
    const meal = this.props.meal;
    return (
      <div className='Page'>
        <header style={this.editModeStyle()}>
          <button
            className="back-button-top"
            onClick={()=> this.props.handleViewChange(this.props.prevView)}
          >
            Back
          </button>
          <h1 className="title">{meal.title}</h1>
          <button
            className="edit-button"
            onClick={this.toggleEdit}
          >
            {this.state.editMode? 'Done' : 'Edit'}
          </button>
        </header>
        <main>
          <div className='meal-contents'>
            {meal.contents.map((food, id) => (
              <Food
                food={food}
                key={id}
                editMode={this.state.editMode}

                handleFoodSelect={(e) => {
                  e.stopPropagation();
                  this.props.handleFoodSelect(food, this.props.appView);
                }}
                handleDelete={(e) => {
                  e.stopPropagation();
                  this.props.onDelete(id)
                }}
                appView={this.props.appView}
              />
            ))}
          </div>
        </main>
        <footer style={this.editModeStyle()}>

        </footer>
      </div>
    )
  }
}
