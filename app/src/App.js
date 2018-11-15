import React, { Component } from 'react';
import { getNatLangFoodResults } from "./services/API";
import moment from 'moment';
import LoginPage from './components/LoginPage/index.js';
import AddFood from './components/AddFood/index.js';
import Log from './components/Log/index.js';
import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      userName: "Steve",
      currentView: "Add Food",
      natLangInput: '',
      singleItemInput: '',
      natLangResults: [],
      singleItemResults: '',
      basket: [],
      log: {
        meals: [],
        misc: []
      },
      badRequest: 3,

    }
  }

  responseGoogle = (resp) => {
    if (resp.accessToken) {
      localStorage.setItem('google_access_token',resp.accessToken)
      // localStorage persists across refreshes
    }
    this.setUserName(resp.profileObj.givenName)
    this.setView("Add Food");
    //asdfasdf
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

            natLangInput={this.state.natLangInput}
            handleNatLangInputChange={this.handleInputChange}
            handleNatLangQuery={this.handleNatLangQuery}

            singleItemInput={this.state.singleItemInput}
            handleSingleItemInputChange={this.handleInputChange}
            handleSingleItemQuery={this.handleSingleItemQuery}

            badRequest={this.state.badRequest}
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

  handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  handleNatLangQuery = async() => {
    const query = this.state.natLangQueryInput;
    try {

      const resp = await getNatLangFoodResults(query);
      this.setState({
        basket: resp,
        natLangQueryInput: ''
      })

    } catch (e) {

      this.setState({
        badRequest: this.state.badRequest + 1
      })

    } finally {

      this.logBasket();

      this.setView("Log");
    }
  }

  handleSingleItemQuery = async() => {
    const query = this.state.singleItemInput;
    try {

      const resp = await getNatLangFoodResults(query);
      this.setState({
        basket: resp,
        natLangQueryInput: ''
      })

    } catch (e) {

      this.setState({
        badRequest: this.state.badRequest + 1
      })

    } finally {

      this.logBasket();

      this.setView("Log");
    }
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
