import { useEffect, useState } from 'react'
import './App.css'
import authServiceObj from './appwrite/authService'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Header } from './components/NavBar/Header'
import { HeaderLoging } from './components/NavBar/HeaderLoging'

import IsLoading from './components/main/IsLoading'
import Footer from './components/NavBar/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authServiceObj.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  

  if (Loading) {
    return (
      <>
        <Header />
        <IsLoading />
        <Footer />
      </>
    )
  }
  else {
    return (
      <>
        <Header />
       <Outlet/>
        <Footer />
      </>
    )
  }
}

export default App;
