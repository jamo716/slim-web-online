import React from "react"
import {MutationProvider} from "./context/MutationContext"
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Header from "./components/Header"
import AddParamsMenu from "./components/AddParamsMenu";
import ParamSets from "./components/ParamSets"
import OutputList from "./components/OutputList"
import OutputChart from "./components/OutputChart";


const useStyles = makeStyles({
    root: {
      marginTop: 30,
      marginBottom: 200,
      marginLeft: 10
    }
  })

function Mutation() {
    const classes = useStyles();

    return (
      <MutationProvider>
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
      </MutationProvider>
    );
}

export default Mutation
