import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import {useEffect} from "react"
import container1 from './containers/container1';
import container2 from './containers/container2';
import MyForm from './containers/MyForm';
import EventPage from './project/container/EventPage';

function App() {
 /*const [dat,setdat]=useState([{}])

 useEffect(()=>{
     fetch('/api').then(
       response => response.json()
     ).then(data=>console.log(data))
   },[]);*/
  return (
   <Router>
      <Route path="/hello" exact={true} component={container1} />
      <Route path="/link2" exact={true} component={container2} />
      <Route path="/venkat" exact={true} component={MyForm} />
      <Route path="/event" exact={true} component={EventPage} />
    </Router>
  );
}

export default App;
