import React from 'react';
import Basket from '../../components/Basket/';
import NatLang from '../NatLang/';
import SingleItem from '../SingleItem/';
import AddMealTitle from '../AddMealTitle/';
import {
  getSingleItemResults
} from "../../services/nutritionix";
import moment from 'moment';
import './style.css';

export default class AddFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      badRequest: 0,
    }
  }

  handleSingleItemQuery = async(e) => {
    e.preventDefault();
    const query = this.state.singleItemInput;
    try {
      const resp = await getSingleItemResults(query);
      this.setState({
        searchResults: resp,
        singleItemInput: ''
      })

    } catch (e) {
      this.setState({
        badRequest: this.state.badRequest + 1
      })
    }
  }

  handleSkipMealTitle = () => {
    this.logBasket(false);
  }

  addMealTitle = (e) => {
    e.preventDefault();
    this.logBasket(true);
  }

  handleLogBasket = () => {
    const basket = this.state.basket
    if (basket.contents.length === 1) {
      this.logBasket();
    } else if (basket.contents.length > 1) {
      this.setView("Meal Title");
    }
  }

  logBasket = (addTitle) => {
    //addTitle is a boolean
    const basket = this.state.basket;
    this.props.logBasket(basket, addTitle);

    //reset state
    this.setState({
      basket: {
        title:'',
        contents: [],
      },
      natLangInput: '',
      singleItemInput:'',
      title:'',
      searchResults: null,
      badRequest: 0,
    })
  }

  emptyBasket = () => {
    this.setState({
      basket: {
        title:'',
        contents: []
      },
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

  getView(){
    switch (this.state.currentView) {
      case "Basket":
        return (
          <Basket
            {...this.state}
            appView={this.props.currentView}
            logBasket={this.logBasket}
            emptyBasket={this.emptyBasket}
            handleViewChange={this.setView}
            onDelete={this.handleDeleteBasketItem}
            onSelect={this.handleSelectBasketItem}
          />
        )
      case "Single Item":
        return (
          <SingleItem
            {...this.state}
            appView={this.props.currentView}
            handleLogBasket={this.handleLogBasket}
            handleSingleItemQuery={this.handleSingleItemQuery}
            handleSingleItemInputChange={this.handleInputChange}
            handleViewChange={this.setView}
            onSelectFood={this.handleSelectFromSingleSearch}
          />
        )
      case "Nat Lang":
        return (
          <NatLang
            {...this.state}
            userName={this.props.userName}
            mealType={this.getMealTypebyTime()}
            handleViewChange={this.setView}
            handleNatLangQuery={this.handleNatLangQuery}
            handleNatLangInputChange={this.handleInputChange}
          />
        )
      case "Meal Title":
        return (
          <AddMealTitle
            mealTitleInput={this.state.basket.title}
            handleMealTitleInputChange={this.handleBasketInputChange}

            mealPhoto= {this.state.basket.photo}
            handleMealPhotoChange= {this.handleBasketInputChange}

            handleSkipClick={this.handleSkipMealTitle}
            handleAddClick={this.addMealTitle}
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

  render(){
    return (
      <div className="Page" id="add-food-page">
        {this.getView()}
      </div>
    )
  }
}
