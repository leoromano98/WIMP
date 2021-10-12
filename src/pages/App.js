import { useState, useEffect, useCallback } from "react";

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
import D3 from "./d3/d3";
import RankPackets from "./rankPackets/rankPackets";
import Clients from "./clients/clients";

import { AuthContext } from "../utils/context";
import { isUserLogedApi, triggerLogin } from "../api/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  function callback(params) {
    if (params) {
      setUser(isUserLogedApi());
    }
  }

  // useEffect(() => {
  //   console.log(1)
  //   setUser(isUserLogedApi());
  //   renderRedirect();
  // }, [isLoginSuccess]);

  function renderRedirect() {
    if (isLoginSuccess) {
      return <Redirect to="/" />;
    }
  }

  useEffect(() => {
    setUser(isUserLogedApi());
    setIsLoginSuccess(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  console.log(user);

  return (
    <AuthContext.Provider value={user}>
      <Header />
      <Router>
        {/* {renderRedirect()} */}
        <Switch>
          {user ? (
            <>
              <Route path="/clients">
                <Clients />
              </Route>
              <Route path="/d3">
                <D3 />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
              <Route path="/landing">
                <Landing />
              </Route>
              <Route path="/alerts">
                <Alerts />
              </Route>
              <Route path="/rankpackets">
                <RankPackets />
              </Route>
              <Route exact path="/login">
                <Redirect to="/" />
              </Route>
              <Route exact path="/">
                <Redirect to="/landing" />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/*">
                <Redirect to="/login" />
                <Login parentCallback={callback} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
