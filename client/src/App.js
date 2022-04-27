import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "./App.css";
import NeutralSim from "./neutral-sim/NeutralSim";
import Mutation from "./mutation/Mutation"
import Selection from "./selection/Selection"
import MutationSelection from "./mut-sel/MutationSelection"
import AssortativeMating from "./assortative-mating/AssortativeMating";
import Drift from "./drift/Drift"
import About from "./about/About"
import NavDrawer from "./components/NavDrawer";
import Cookies from "js-cookie"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "white"
    },
    primary: {
      main: "#00203FFF"
    },
    secondary: {
      main: '#ADEFD1FF'
    }
  }
});

function App() {

  useEffect(() => {
    if(!Cookies.get("userID")){
      Cookies.set("userID", Math.floor(Math.random() * 100000 + 1), {expires: 365})
    }
  }, [])

  return (
    <Router>
        <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <NavDrawer/>
          <Switch>
            <Route path="/neutralsim" component={NeutralSim}/>
            <Route path="/assortativemating" component={AssortativeMating}/>
            <Route path="/mutation" component={Mutation}/>
            <Route path="/selection" component={Selection}/>
            <Route path="/mutationselection" component={MutationSelection}/>
            <Route path="/drift" component={Drift}/>
            <Route path="/" exact component={About}/>
          </Switch>
        {/* </NavDrawer> */}
        </MuiThemeProvider>
    </Router>
  );
  
}

export default App;
