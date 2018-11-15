import React from 'react';
import NatLang from './components/NatLang';
import SingleItem from './components/SingleItem';
import moment from 'moment';
import './style.css';

//props
// userName

// natLangInput
// handleNatLangInputChange
// handleNatLangQuery

// singleItemInput
// handleSingleItemInputChange
// handleSingleItemQuery
// badRequest

function getMealTypebyTime(){
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

function getView(props){
  debugger;
  switch (props.badRequest) {
    case 3:
      return (
        <SingleItem
          singleItemInput={props.singleItemQueryInput}
          handleSingleItemInputChange={props.handleSingleItemInputChange}
          handleSingleItemQuery={props.handleSingleItemQuery}
        />
      )
    default:
      return (
        <NatLang
          userName={props.userName}
          mealType={getMealTypebyTime()}

          natLangInput={props.natLangInput}
          handleNatLangInputChange={props.handleNatLangInputChange}
          handleNatLangQuery={props.handleNatLangQuery}
        />
      )

  }
}

export default function AddFood(props) {
  return (
    <div className="Page" id="add-food-page">
      {getView(props)}
    </div>
  )
}
