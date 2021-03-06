import * as React from 'react';
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from "react-redux"
import { setLoggedIn, setLogout, setUser } from './store/actions/application.actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if(isLoggedIn) {
      dispatch(setLoggedIn())
      dispatch(setUser(user))
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default App
