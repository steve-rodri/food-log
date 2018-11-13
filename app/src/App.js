import React, { Component } from 'react';
import {getNatLangFoodResults} from "./services/API";
import moment from 'moment';
import LoginPage from './components/LoginPage/index.js';
import AddFood from './components/AddFood/index.js';
import Log from './components/Log/index.js';
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
      searchFoodResults: [],
      basket: [],
      log: {
        meals: [],
        misc: []
      }
    }
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

  setView = (view) => {
    this.setState({
      currentView: view,
    })
  }

  handleViewChange = () => {
    this.setView("Add Food");
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
            natLangQueryInput={this.state.natLangQueryInput}
            handleNatLangInputChange={this.handleNatLangInputChange}
            handleNatLangQuery={this.handleNatLangQuery}
          />
        )
      case "Log":
        return (
          <Log
            log={this.state.log}
            handleViewChange={this.handleViewChange}
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

  handleNatLangInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  handleNatLangQuery = async() => {
    const query = this.state.natLangQueryInput;
    const resp = await getNatLangFoodResults(query);

    this.setState({
      basket: resp,
      natLangQueryInput: ''
    })

    this.logBasket();

    this.setView("Log");
  }

  logBasket(){
    const log = this.state.log;
    const meals = this.state.log.meals;
    const misc = this.state.log.misc;
    const basket = this.state.basket;

    if (basket.length > 1) {
      this.setState({
        log: {
          ...log,
          meals: [
            ...meals,
            [...basket],
          ]
        },
        basket: []
      })
    } else if (basket.length === 1) {
      this.setState({
        log: {
          ...log,
          misc: [
            ...misc,
            [...basket],
          ]
        },
        basket: []
      })
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
