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
import Map from "./map/map";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/map">
            {" "}
            <Map />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
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
