//this is the page for the default neutral script that was used for the proof of concept
import React from "react"
import Header from "./components/Header"
import ParamSets from "./components/ParamSets"
import AddParamsMenu from "./components/AddParamsMenu"
import OutputList from "./components/OutputList";
import OutputChart from "./components/OutputChart";
import {NeutralSimProvider} from "./context/NeutralSimContext"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: 30,
    marginBottom: 200,
    marginLeft: 10
  }
})

function NeutralSim() {
  
  const classes = useStyles()

    return (
      <NeutralSimProvider>
          <Grid container className={classes.root}>
            <Grid item xs={4} className={classes.input}>
              <Header/>
              <AddParamsMenu/>
              <ParamSets/>
            </Grid>
            <Grid item xs={4}>
              <OutputList/>
            </Grid>
            <Grid item xs={4}>
              <OutputChart/>
            </Grid>
          </Grid>
      </NeutralSimProvider>
    );
  }
  export default NeutralSim;
  