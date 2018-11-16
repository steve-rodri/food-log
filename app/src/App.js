import React, { Component } from 'react';
import { getNatLangFoodResults, getSingleItemResults } from "./services/API";
import LoginPage from './components/LoginPage/index.js';
import AddFood from './components/AddFood/index.js';
import Log from './components/Log/index.js';
import Targets from './components/Targets/index.js';
import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      userName: "",
      currentView: "Add Food",
      natLangInput: '',
      singleItemInput: '',
      natLangResults: [],
      singleItemResults: '',
      searchItems: null,
      basket: [],
      log: {
        meals: [],
        misc: []
      },
      badRequest: 0,

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

  handleViewChange = (view) => {
    this.setView(view);
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
            basket={this.state.basket}
            logBasket={this.logBasket}

            natLangInput={this.state.natLangInput}
            handleNatLangInputChange={this.handleInputChange}
            handleNatLangQuery={this.handleNatLangQuery}

            singleItemInput={this.state.singleItemInput}
            handleSingleItemInputChange={this.handleInputChange}
            handleSingleItemQuery={this.handleSingleItemQuery}
            searchItems={this.state.searchItems}
            handleFoodSelect={this.handleFoodSelect}
            handleDelete={this.handleDelete}

            badRequest={this.state.badRequest}
          />
        )
      case "Log":
        return (
          <Log
            currentPage={this.state.currentPage}
            log={this.state.log}
            handleViewChange={this.handleViewChange}
            handleFoodSelect={this.handleFoodSelect}
            onDelete={this.handleDelete}
          />
        )
      case "Targets":
       return (
          <Targets

          />
        )
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

  handleNatLangQuery = async(e) => {
    e.preventDefault();
    const query = this.state.natLangInput;
    try {
      const resp = await getNatLangFoodResults(query);
      this.setState({
        basket: resp,
        natLangQueryInput: ''
      })
      this.logBasket();

    } catch (e) {

      alert("Something might be wrong with your text, check for typos. If that's good, try again. If still having issues, try a single item search.")

      this.setState({
        badRequest: this.state.badRequest + 1
      })

    }
  }

  handleSingleItemQuery = async(e) => {
    e.preventDefault();
    const query = this.state.singleItemInput;
    try {

      const resp = await getSingleItemResults(query);
      this.setState({
        searchItems: resp,
        singleItemInputInput: ''
      })

    } catch (e) {
      this.setState({
        badRequest: this.state.badRequest + 1
      })

    }
  }

  handleFoodSelect = (food, view) => {
    switch (view) {
      case "Add Food":
        const basket = this.state.basket;
        this.setState({
          basket: [
            ...basket,
            food
          ]
        })
        break;
      case "Log" || "Basket":
        this.setView("Targets")
        break;
    }
  }

  handleDelete = (id, type, view1, view2) => {
    switch (view1) {
      case "Log":
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
        }
        break;
      case "Add Food":
        switch (view2) {
          case "Basket":
            this.setState( (prevState, props) => {
              const basket = [...prevState.basket];
              basket.splice(id, 1);
              return {
                basket: basket,
              }
            });
            break;
        }
        break;
    }
  }

  logBasket = () => {
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
        basket: [],
        searchItems: null,
        badRequest: 0,
      })
      this.setView("Log");
    } else if (basket.length === 1) {
      this.setState({
        log: {
          ...log,
          misc: [
            ...misc,
            [...basket],
          ]
        },
        basket: [],
        searchItems: null,
        badRequest: 0,
      })
      this.setView("Log");
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
