import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "./App.css";
import NeutralSim from "./neutral-sim/NeutralSim";
import AssortativeMating from "./assortative-mating/AssortativeMating";
import About from "./about/About"
import NavDrawer from "./components/NavDrawer";
import Cookies from "js-cookie"


function App() {

  useEffect(() => {
    if(!Cookies.get("user_id")){
      Cookies.set("user_id", Math.floor(Math.random() * 100000 + 1))
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <NavDrawer>
          <Switch>
            <Route path="/neutralsim" component={NeutralSim}/>
            <Route path="/assortativemating" component={AssortativeMating}/>
            <Route path="/about" component={About}/>
          </Switch>
        </NavDrawer>
      </div>
    </Router>
  );
  
}

export default App;
