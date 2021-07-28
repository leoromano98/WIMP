import {useState, useEffect} from 'react';

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./header/header";
import Login from "./login/login";
import Landing from "./landing/landing";
import Alerts from "./alerts/alerts";
import Map from "./map/map";


function App() {
  const [token,setToken]=useState(null);
  const [login,setLogin]=useState(false);

  useEffect( ()=>{
    let storage = JSON.parse(localStorage.getItem('token'));
    console.log('storage:L ' + storage)
    if(storage!=null){
      setToken(storage.token)
    }
    else{
      console.log('sin login')
    }
  })

    return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/alerts">
            <Alerts />
          </Route>
          
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
