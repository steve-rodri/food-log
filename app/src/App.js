import React, { Component } from 'react';
import LoginPage from './components/LoginPage/index.js';
import AddFood from './components/AddFood/index.js';
import Log from './components/Log/index.js';
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
            handleSelect={this.handleSelect}
            onDelete={this.handleDelete}
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

  handleSelect = (food, type, view) => {

    this.setState({
      selection: food,
    });

    switch (type) {
      case "Misc":
        console.log("set View to Targets")
        console.log("set prev View to Log")
        break;
      case "Meal":
        console.log("set View to Expand Meal")
        console.log("set prev View to Log")
        break;
      default:
        break;
    }
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

  logBasket = (basket, addTitle) => {
    //addTitle is a boolean
    const tempBasket = {...basket};
    const log = this.state.log;
    const meals = this.state.log.meals;
    const misc = this.state.log.misc;
    if (basket.contents.length !== 0) {
      if (basket.contents.length > 1) {
        if (!addTitle) {
          tempBasket.mealTitleInput = '';
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
