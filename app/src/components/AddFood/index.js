import React from 'react';
import { getNatLangFoodResults, getSingleItemResults } from "./services/API";
import Basket from './components/Basket';
import NatLang from './components/NatLang';
import SingleItem from './components/SingleItem';
import AddMealTitle from './components/AddMealTitle';
import moment from 'moment';
import './style.css';

export default class AddFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "Nat Lang",
      natLangInput: '',
      singleItemInput: '',
      searchResults: null,
      basket: {
        mealPhoto: null,
        mealTitleInput:'',
        contents: [],
      },
      badRequest: 0,
    }
  }

  setView = (view) => {
    this.setState({
      currentView: view
    });
  }

  setAppView = (view) => {
    this.props.handleViewChange(view);
  }

  getView(){
    switch (this.state.currentView) {
      case "Basket":
        return (
          <Basket
            appView={this.props.currentView}
            addFoodView={this.state.currentView}

            basket={this.state.basket}
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
            appView={this.props.currentView}
            addFoodView={this.state.currentView}

            basket={this.state.basket}
            handleLogBasket={this.handleLogBasket}

            singleItemInput={this.state.singleItemInput}
            handleSingleItemQuery={this.handleSingleItemQuery}
            handleSingleItemInputChange={this.handleInputChange}
            searchResults={this.state.searchResults}

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
      case "Meal Title":
        return (
          <AddMealTitle
            mealTitleInput={this.state.basket.mealTitleInput}
            handleMealTitleInputChange={this.handleBasketInputChange}

            mealPhoto= {this.state.basket.mealPhoto}
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

  handleDeleteBasketItem = (id) => {
    const basket = this.state.basket
    const basketContents = [...this.state.basket.contents];
    basketContents.splice(id, 1);
    this.setState({
      basket: {
        ...basket,
        contents: basketContents
      },
    })
  }

  handleSelectBasketItem = (food, view) => {
    console.log('basketItem Selected')
  }

  handleSelectFromSingleSearch = (food) => {
    const basket = this.state.basket;
    const basketContents = this.state.basket.contents;
    this.setState({
      basket: {
        ...basket,
        contents: [...basketContents, food],
      },
    })
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    })
  }

  handleBasketInputChange = (e) => {
    const basket = this.state.basket;
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      basket: {
        ...basket,
        [name]: value,
      }
    })
  }

  handleNatLangQuery = async(e) => {
    e.preventDefault();
    const basket = this.state.basket;
    const query = this.state.natLangInput;
    try {

      const resp = await getNatLangFoodResults(query);
      this.setState({
        basket: {
          ...basket,
          contents: resp,
        },
        natLangQueryInput: '',
      });

      this.handleLogBasket();

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
        mealTitleInput:'',
        contents: [],
      },
      natLangInput: '',
      singleItemInput:'',
      mealTitleInput:'',
      searchResults: null,
      badRequest: 0,
    })
  }

  emptyBasket = () => {
    this.setState({
      basket: {
        mealTitleInput:'',
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

  render(){
    return (
      <div className="Page" id="add-food-page">
        {this.getView()}
      </div>
    )
  }
}
