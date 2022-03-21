import React from "react"
import {SelectionProvider} from "./context/SelectionContext"
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Header from "./components/Header"
import AddParamsMenu from "./components/AddParamsMenu";
import ParamSets from "./components/ParamSets";
import OutputList from "./components/OutputList"
import OutputChart from "./components/OutputChart";

const useStyles = makeStyles({
    root: {
      marginTop: 30,
      marginBottom: 200,
      marginLeft: 10
    }
  })

function Selection() {
    const classes = useStyles();

    return (
      <SelectionProvider>
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
      </SelectionProvider>
    );
}

export default Selection
