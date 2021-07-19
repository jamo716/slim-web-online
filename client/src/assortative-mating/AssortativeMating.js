import React from 'react'
import {AssortativeMatingProvider} from './context/AssortativeMatingContext'
import Header from "./components/Header"
import AddParamsMenu from './components/AddParamsMenu'
import Paramsets from './components/Paramsets'
import OutputList from "./components/OutputList"
import HistogramChart from "./components/HistogramChart"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      marginTop: 30,
      marginBottom: 200,
      marginLeft: 10
    }
  })

const AssortativeMating = () => {

    const classes = useStyles()

    return (
        // <AssortativeMatingProvider>
        //     <div className="container">
        //         <div className="input-output">
        //             <div className="input">
        //                 <Header/>
        //                 <AddParamsMenu/>
        //                 <Paramsets/>
        //             </div>
        //             <div className="output">
        //                 <OutputList/>
        //             </div>
        //             <div className="output-chart">
        //                 <HistogramChart/>
        //             </div>
        //         </div>
        //     </div>
        // </AssortativeMatingProvider>

        <AssortativeMatingProvider>
            <Grid container className={classes.root}>
                <Grid item xs={4}>
                    <Header/>
                    <AddParamsMenu/>
                    <Paramsets/>
                </Grid>
                <Grid item xs={4}>
                    <OutputList/>
                </Grid>
                <Grid item xs={4}>
                    <HistogramChart/>
                </Grid>
            </Grid>
        </AssortativeMatingProvider>
    )
}

export default AssortativeMating