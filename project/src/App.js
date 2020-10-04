import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
//import {useEffect} from "react"
import Home from './containers/home';
import Farm from './containers/farm';

function App() {

  return (
   <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/farm" exact={true} component={Farm} />
    </Router>
  );
}

export default App;
