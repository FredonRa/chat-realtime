import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { AuthProvider } from './auth';

import Register from './Register';
import Login from './Login';
import Chat from './Chat';

import Navbar from './components/Navbar';


import './App.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Router>
        <Route component={Chat} exact path="/" />
        <Route component={Login} exact path="/login" /> 
        <Route component={Register} exact path="/register" />
      </Router>
    </AuthProvider>
  );
}

export default App;