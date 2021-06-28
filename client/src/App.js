import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "./App.css";
import Nav from "./components/Nav"
import NavBar from "./components/NavBar"
import NeutralSim from "./neutral-sim/NeutralSim";
import About from "./about/About"


function App() {

  return (
    <Router>
      <NavBar/>
      <div className="app">
        <Switch>
          <Route path="/neutralsim" component={NeutralSim}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
