import React from 'react';
import NatLang from './components/NatLang';
import SingleItem from './components/SingleItem';
import moment from 'moment';
import './style.css';

//props

// userName
// currentView
// basket
// logBasket

// natLangInput
// handleNatLangInputChange
// handleNatLangQuery

// singleItemInput
// handleSingleItemInputChange
// handleSingleItemQuery
// searchItems
// handleFoodSelect

// badRequest

export default class AddFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "Nat Lang"
    }
    this.setView = this.setView.bind(this);
  }

  setView(view){
    this.setState({
      currentView: view
    })
  }

  getView(){
    switch (this.state.currentView) {
      case "Single Item":
        return (
          <SingleItem
            basket={this.props.basket}
            singleItemInput={this.props.singleItemQueryInput}
            handleSingleItemInputChange={this.props.handleSingleItemInputChange}
            handleSingleItemQuery={this.props.handleSingleItemQuery}
            searchItems={this.props.searchItems}
            onSelectFood={this.props.handleFoodSelect}
            logBasket={this.props.logBasket}
          />
        )
      case "Nat Lang":
        return (
          <NatLang
            userName={this.props.userName}
            mealType={this.getMealTypebyTime()}
            handleViewChange={this.setView}
            natLangInput={this.props.natLangInput}
            handleNatLangInputChange={this.props.handleNatLangInputChange}
            handleNatLangQuery={this.props.handleNatLangQuery}
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

  render(){
    return (
      <div className="Page" id="add-food-page">
        {this.getView()}
      </div>
    )
  }
}
