import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addBasketToLog, resetBasket, setView, editBasket } from '../../redux'
import './style.css';
import buttonStyles from '../../buttons.module.css'

const AddMealTitle = () => {
  const basket = useSelector(state => state.basket);
  const titleRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => titleRef.current.focus(), [])

  const handleChange = (e) => {
    basket.title = e.target.value
    dispatch(editBasket(basket))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addBasketToLog())
    dispatch(resetBasket())
    dispatch(setView('Log'))
  }

  return (
    <div className="Page AddMealTitle">
      <main>
          <form onSubmit={handleSubmit}>
            <p>Make this a meal by giving it a title:</p>
            <input
              ref={titleRef}
              value={basket.title}
              onChange={handleChange}
            />
          </form>
      </main>

      <footer>
        <div className="Buttons">
          <SkipButton onSubmit={handleSubmit}/>
          <AddButton onSubmit={handleSubmit} title={basket.title}/>
        </div>
      </footer>
    </div>
  )
}

const SkipButton = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit}>
      Skip
    </button>
  )
}

const AddButton = ({ onSubmit, title }) => {
  const style = () => title? buttonStyles.greenhighlight : null
  return (
    <button
      onClick={onSubmit}
      className={style()}
    >
      Add
    </button>
  )
}

export default AddMealTitle
