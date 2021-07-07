import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "./App.css";
import NeutralSim from "./neutral-sim/NeutralSim";
import AssortativeMating from "./assortative-mating/AssortativeMating";
import About from "./about/About"
import NavDrawer from "./components/NavDrawer";
import Cookies from "js-cookie"
import NeutralSimAbout from "./neutral-sim/NeutralSimAbout"
import AssortativeMatingAbout from "./assortative-mating/AssortativeMatingAbout"


function App() {

  useEffect(() => {
    if(!Cookies.get("userID")){
      Cookies.set("userID", Math.floor(Math.random() * 100000 + 1))
    }
  }, [])

  return (
    <Router>
        <NavDrawer>
          <Switch>
            <Route path="/neutralsim" component={NeutralSim}/>
            <Route path="/assortativemating" component={AssortativeMating}/>
            <Route path="/about" component={About}/>
            <Route path="/neutralsim-about" component={NeutralSimAbout}/>
            <Route path="/assortativemating-about" component={AssortativeMatingAbout}/>
          </Switch>
        </NavDrawer>
    </Router>
  );
  
}

export default App;
