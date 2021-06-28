import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "./App.css";
import NeutralSim from "./neutral-sim/NeutralSim";
import About from "./about/About"
import NavDrawer from "./components/NavDrawer";


function App() {

  return (
    <Router>
      <div className="app">
        <NavDrawer>
          <Switch>
            <Route path="/neutralsim" component={NeutralSim}/>
            <Route path="/about" component={About}/>
          </Switch>
        </NavDrawer>
      </div>
    </Router>
  );
}

export default App;
