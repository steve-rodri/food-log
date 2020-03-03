import React, { Fragment, useState, useEffect, useRef } from 'react';
import Food from '../../components/Food';
import { useSelector, useDispatch } from 'react-redux'
import { setView, addBasketToLog, addBasketItem, setResults, resetBasket, clearResults } from '../../redux'
import { getSingleItemResults } from '../../services/nutritionix'
import './style.css';
import buttonStyles from '../../buttons.module.css'

const SingleItem = (props) => {
  const results = useSelector(state => state.searchResults)
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()

  const handleChange = async(e) => {
    const { value } = e.target
    setSearchField(value)
    if (value.length > 2) {
      try {
        const results = await getSingleItemResults(value)
        dispatch(setResults(results))
      } catch(e){}
    } else {
      dispatch(clearResults())
    }
  }
  const handleSelect = (food) => dispatch(addBasketItem(food))
  const handleSubmit = async (e) => {
    e.preventDefault()
    const results = await getSingleItemResults(searchField)
    dispatch(setResults(results))
  }

  return (
    <div className="SingleItem Page">
      <header>
        <h1>Search</h1>
        <BasketButton/>
      </header>

      <main>
        <SearchResults results={results} onSelect={handleSelect}/>
        <Search
          value={searchField}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </main>

      <footer>
        <div className="Buttons">
          <BackButton/>
          <LogButton/>
        </div>
      </footer>
    </div>
  )
}

const Search = ({value, onChange, onSubmit }) => {
  const inputRef = useRef()
  useEffect(() => inputRef.current.focus(), [])
  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        onFocus={() => inputRef.current.select()}
        value={value}
        onChange={onChange}
        placeholder="search..."
      />
    </form>
  )
}

const SearchResults = ({ results, onSelect }) => {
  if (!results) return null;
  return (
    <Fragment>
      <CommonFoods data={results.common} onSelect={onSelect}/>
      <BrandedFoods data={results.branded} onSelect={onSelect}/>
    </Fragment>
  )
}

const CommonFoods = ({ data, onSelect }) => {
  if (!data || !data.length) return null;
  const range = (
    data.length > 5?
    [...Array(5).keys()] :
    [...Array(data.length).keys()]
  );

  return (
    <Fragment>
      <h3>Common</h3>
      <div className="SingleItem-Results-Group">
        {
          range.map( i =>
            <Food
              key={i}
              food={data[i]}
              onSelect={() => onSelect(data[i])}
            />
          )
        }
      </div>
    </Fragment>
  )
}

const BrandedFoods = ({ data, onSelect }) => {
  if (!data || !data.length) return null;
  const range = (
    data.length > 5?
    [...Array(5).keys()] :
    [...Array(data.length).keys()]
  );

  return (
    <Fragment>
      <h3>Branded</h3>
      <div className="SingleItem-Results-Group">
        {
          range.map( i =>
            <Food
              key={i}
              food={data[i]}
              onSelect={() => onSelect(data[i])}
            />
          )
        }
      </div>
    </Fragment>
  )
}

const BasketButton = () => {
  const basket = useSelector(state => state.basket)
  const dispatch = useDispatch()
  if (!basket.contents.length) return null;
  return (
    <button
      className="SingleItem-Basket-Button"
      onClick={() => dispatch(setView('Basket'))}
    >
      {`Selected: ${basket.contents.length}`}
    </button>
  )
}

const BackButton = () => {
  const dispatch = useDispatch()
  return (
    <button
      className="Back-Button"
      onClick={()=> dispatch(setView('NatLang'))}
    >
      Back
    </button>
  )
}

const LogButton = ( ) => {
  const basket = useSelector(state => state.basket)
  const dispatch = useDispatch()

  const onSubmit = () => {
    if (!basket.contents.length) dispatch(setView('Log'));
    if (basket.contents.length > 1) dispatch(setView('AddMealTitle'));
    else {
      dispatch(addBasketToLog())
      dispatch(resetBasket())
      dispatch(clearResults())
      dispatch(setView('Log'))
    }
  }

  const style = () => basket.contents && basket.contents.length? buttonStyles.greenhighlight : null

  return (
    <button
      onClick={onSubmit}
      className={style()}
    >
      {basket.contents.length > 1? "Log Meal" : "Log"}
    </button>
  )
}

export default SingleItem
