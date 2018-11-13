import React, { Component } from 'react';
import {getFoodResults} from "./services/API";
import moment from 'moment';
import LoginPage from './components/LoginPage';
import AddFood from './components/AddFood';
import Log from './components/Log.js';
import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      userName: "",
      currentView: "Login",
      natLangQueryInput: '',
      searchFoodInput: '',
      natLangResults: [],
      searchFoodResults: []
    }
    this.responseGoogle = this.responseGoogle.bind(this);
    this.setView = this.setView.bind(this);
  }

  responseGoogle = (resp) => {
    if (resp.accessToken) {
      localStorage.setItem('google_access_token',resp.accessToken)
      // localStorage persists across refreshes
    }
    this.setUserName(resp.profileObj.givenName)
    this.setView("Add Food");
  }

  setUserName(user){
    this.setState({
      userName: user
    })
  }

  setView(view){
    this.setState({
      currentView: view,
    })
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
            mealType={this.getMealTypebyTime}
          />
        )
      case "Log":
        return (
          <Log

          />
        )
      // case "Targets":
      //  return (
      //     <Targets
      //
      //     />
      //   )
      // case "Nutrient Breakdown":
      //  return (
      //    <NutrientBreakdown
      //
      //    />
      //  )
      default:
        return (
          <LoginPage
            responseGoogle={this.responseGoogle}
          />
        )

    }
  }

  getMealTypebyTime(){
    const currentTime = moment().format();
    const morningZ = moment().startOf('day').add(6, "hours");
    const morning = moment(morningZ).format()
    const noonZ = moment().startOf('day').add(11, "hours");
    const noon = moment(noonZ).format()
    const eveningZ = moment().startOf('day').add(17, "hours");
    const evening = moment(eveningZ).format();

    if (moment(currentTime).isBetween(morning, noon)) {
      return "Breakfast"
    } else if (moment(currentTime).isBetween(noon, evening)) {
      return "Lunch"
    } else if (moment(currentTime).isAfter(evening)) {
      return "Dinner"
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
