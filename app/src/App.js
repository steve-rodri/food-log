import React, { Component } from 'react';
import LoginPage from './components/LoginPage/index.js';
import AddFood from './components/AddFood/index.js';
import Log from './components/Log/index.js';
import ExpandedMeal from './components/ExpandedMeal/index.js';
import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      userName: "",
      currentView: "Add Food",
      prevView: '',
      log: {
        meals: [],
        misc: []
      },
      selection: {
        meal: {},
        food: {}
      }
    }
  }

  responseGoogle = (resp) => {
    if (resp.accessToken) {
      localStorage.setItem('google_access_token',resp.accessToken)
    }
    this.setUserName(resp.profileObj.givenName)
    this.setCurrentView("Add Food");
  }

  setUserName(user) {
    this.setState({
      userName: user
    })
  }

  setCurrentView = (view) => {
    this.setState({
      currentView: view,
    })
  }

  setPrevView = (view) => {
    this.setState({
      prevView: view,
    })
  }

  handleViewChange = (view, from) => {
    this.setCurrentView(view);
    this.setPrevView(from);
  }

  getView(){
    switch (this.state.currentView) {
      case "Login":
        return (
          <LoginPage
            responseGoogle={this.responseGoogle}
          />
        )
      case "Add Food":
        return (
          <AddFood
            userName={this.state.userName}
            currentView={this.state.currentView}

            logBasket={this.logBasket}

            handleViewChange={this.handleViewChange}
            handleFoodSelect={this.handleFoodSelect}
            handleDelete={this.handleDelete}
          />
        )
      case "Log":
        return (
          <Log
            log={this.state.log}
            currentView={this.state.currentView}

            handleViewChange={this.handleViewChange}
            handleMealSelect={this.handleMealSelect}
            handleFoodSelect={this.handleFoodSelect}
            onDelete={this.handleDelete}
          />
        )
      case 'Expanded Meal':
        return (
          <ExpandedMeal
            meal={this.state.selection.meal}

            handleViewChange={this.handleViewChange}
            handleFoodSelect={this.handleFoodSelect}
            onDelete={this.handleDeleteFromExpanded}

            appView={this.state.currentView}
            prevView={this.state.prevView}
          />
        )
      default:
        return (
          <LoginPage
            responseGoogle={this.responseGoogle}
          />
        )

    }
  }

  handleFoodSelect = (food, view, id) => {
    const selection = {...this.state.selection};
    this.setState({
      selection: {
        ...selection,
        food: {
          id: id,
          ...food
        }
      }
    });
    console.log("set View to Targets")
    console.log("set prev View to view")
  }

  handleMealSelect = (meal, view, id) => {
    const selection = {...this.state.selection};
    this.setState({
      selection: {
        ...selection,
        meal: {
          id: id,
          ...meal
        }
      }
    });
    this.setCurrentView('Expanded Meal');
    this.setPrevView(view);
  }

  handleDelete = (id, type) => {
    switch (type) {
      case 'meal':
        this.setState( (prevState, props) => {
          const meals = [...prevState.log.meals];
          meals.splice(id, 1);
          return {
            log:{
              ...prevState.log,
              meals: meals,
            }
          }
        });
        break;
      case 'misc':
        this.setState( (prevState, props) => {
          const misc = [...prevState.log.misc];
          misc.splice(id, 1);
          return {
            log:{
              ...prevState.log,
              misc: misc,
            }
          }
        });
        break;
      default:
        break;
    }
  }

  handleDeleteFromExpanded = (id) => {
    const log = {...this.state.log}
    const selection = {...this.state.selection}
    const meals = log.meals
    const meal = selection.meal
    const mealId = meal.id;
    const mealContents = meal.contents

    mealContents.splice(id, 1);

    //if no meal contents
    if (mealContents.length === 0) {
      //delete meal from log
      meals.splice(mealId, 1);
    } else {
      meals[mealId] = {
        contents: mealContents,
        title: selection.meal.title,
        photo: selection.meal.photo
      }
    }


    this.setState({
      log: {
        ...log,
      },
      selection: {
        ...selection,
        meal: {
          ...meal,
          contents: mealContents
        }
      }
    })
  }

  logBasket = (basket, addTitle) => {
    //addTitle is a boolean
    const tempBasket = {...basket};
    const log = this.state.log;
    const meals = this.state.log.meals;
    const misc = this.state.log.misc;
    if (basket.contents.length !== 0) {
      if (basket.contents.length > 1) {
        if (!addTitle) {
          tempBasket.title = '';
        }
        this.setState({
          log: {
            ...log,
            meals: [
              ...meals,
              tempBasket,
            ]
          },
        })
      } else if (basket.contents.length === 1) {
        this.setState({
          log: {
            ...log,
            misc: [
              ...misc,
              ...basket.contents,
            ]
          },
        });
      }
      this.setCurrentView('Log');
    }
  }

  render() {
    return (
      <div className="App">
        {this.getView()}
      </div>
    );
  }
}

export default App;
