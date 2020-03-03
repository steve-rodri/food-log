import React, { useEffect } from 'react';
import Login from './pages/Login/';
import Log from './pages/Log/';
import ExpandedMeal from './pages/ExpandedMeal/';
import NatLang from './pages/NatLang'
import SingleItem from './pages/SingleItem'
import AddMealTitle from './pages/AddMealTitle'
import Basket from './pages/Basket'
import { useSelector } from 'react-redux'
import { fetchUser } from './services/google'
import './App.css';
import './buttons.module.css'

export default function App() {
  const view = useSelector(state => state.view.current)
  const authorize = () => {
    const authorizeUser = async() => await fetchUser()
    authorizeUser()
  }
  useEffect(() =>authorize(), [])

  const render = () => {
    switch (view) {
      case "Basket":
        return <Basket/>
      case "SingleItem":
        return <SingleItem/>
      case "NatLang":
        return <NatLang/>
      case "AddMealTitle":
        return <AddMealTitle/>
      case "Log":
        return <Log/>
      case "ExpandedMeal":
        return <ExpandedMeal/>
      case "Login":
        return <Login/>
      default:
        return null
    }
  }

  return render()
}
