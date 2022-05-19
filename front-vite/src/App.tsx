import * as React from 'react';
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from "react-redux"
import { setLoggedIn, setUser } from './store/actions/application.actions';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const state = JSON.parse(localStorage.getItem("user") || "{}");
    if(state) {
      dispatch(setLoggedIn())
      dispatch(setUser(state))
    };
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
