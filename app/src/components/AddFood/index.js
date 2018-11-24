import React from 'react';
import { getNatLangFoodResults, getSingleItemResults } from "./services/API";
import Basket from './components/Basket';
import NatLang from './components/NatLang';
import SingleItem from './components/SingleItem';
import moment from 'moment';
import './style.css';

export default class AddFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "Nat Lang",
      natLangInput: '',
      singleItemInput: '',
      natLangResults: [],
      singleItemResults: '',
      searchItems: null,
      basket: [],
      basketCount: 0,
      badRequest: 0,
    }
  }

  setView = (view) => {
    this.setState({
      currentView: view
    })
  }

  setAppView = (view) => {

    this.props.handleViewChange(view)

  }

  getView(){
    switch (this.state.currentView) {
      case "Basket":
        return (
          <Basket
            appView={this.props.currentView}
            addFoodView={this.state.currentView}

            basket={this.state.basket}
            basketCount={this.state.basketCount}
            logBasket={this.logBasket}

            handleViewChange={this.setView}
            onDelete={this.handleDeleteBasketItem}
            onSelect={this.handleSelectBasketItem}
          />
        )
      case "Single Item":
        return (
          <SingleItem
            appView={this.props.currentView}
            addFoodView={this.state.currentView}

            basket={this.state.basket}
            logBasket={this.logBasket}

            singleItemInput={this.state.singleItemQueryInput}
            handleSingleItemQuery={this.handleSingleItemQuery}
            handleSingleItemInputChange={this.handleInputChange}
            searchItems={this.state.searchItems}

            handleViewChange={this.setView}
            onSelectFood={this.handleSelectFromSingleSearch}
          />
        )
      case "Nat Lang":
        return (
          <NatLang
            userName={this.props.userName}
            mealType={this.getMealTypebyTime()}
            handleViewChange={this.setView}

            natLangInput={this.state.natLangInput}
            handleNatLangQuery={this.handleNatLangQuery}
            handleNatLangInputChange={this.handleInputChange}
          />
        )
      default:
        return (
          <NatLang
            userName={this.props.userName}
            mealType={this.getMealTypebyTime()}
            handleViewChange={this.setView}

            natLangInput={this.state.natLangInput}
            handleNatLangQuery={this.handleNatLangQuery}
            handleNatLangInputChange={this.handleInputChange}
          />
        )
    }
  }

  handleDeleteBasketItem = (id) => {
    const basket = [...this.state.basket];
    basket.splice(id, 1);
    this.setState({
      basket: basket,
    })
  }

  handleSelectBasketItem = (food, view) => {
    console.log('basketItem Selected')
  }

  handleSelectFromSingleSearch = (food) => {
    const basket = this.state.basket;
    this.setState({
      basket: [
        ...basket,
        food
      ]
    })
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

  logBasket = () => {
    this.props.logBasket(this.state.basket);
    this.setState({
        basket: [],
        natLangInput: '',
        singleItemInput:'',
        searchItems: null,
        badRequest: 0,
    })
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

  render(){
    return (
      <div className="Page" id="add-food-page">
        {this.getView()}
      </div>
    )
  }
}
