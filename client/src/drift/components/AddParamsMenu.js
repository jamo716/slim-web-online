/*
The parameter set menu component of the web-app.
Allows user to input parameter values and then submit them to the paramSets global state.
*/

import {useState, useContext} from "react"
import { DriftContext } from "../context/DriftContext"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core';
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles({
    field: {
      marginTop: 20, 
      marginBottom: 20,
      display: "block"
    },
    button: {
        marginTop: 20, 
        marginBottom: 20
    }
})

const popSizeMarks = [
    {
        value: 25,
        label: "25"
    },
    {
        value: 50,
        label: "50"
    },
    {
        value: 100,
        label: "100"
    },
    {
        value: 150,
        label: "150"
    },
    {
        value: 250,
        label: "250"
    }
]

const simLengthMarks = [
    {
        value: 10,
        label: "10"
    },
    {
        value: 50,
        label: "50"
    },
    {
        value: 100,
        label: "100"
    },
    {
        value: 250,
        label: "250"
    },
    {
        value: 500,
        label: "500"
    }
]

// function calculateValue(value) {
//     return 10 ** -value;
//   }

const AddParamsMenu = (() => {
    const classes = useStyles()

    //functions and global state from context API
    const {showParamMenu, addParamSet} = useContext(DriftContext)

    //state for addition of new parameter sets
    const [title, setTitle] = useState("")
    const [popSize, setPopSize] = useState(500)
    const [simLength, setSimLength] = useState(10)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert("Please supply values to all parameters.")
        }else{
            addParamSet({title, popSize, simLength})

            setTitle("")
        }
    }

    return(
        <Container>
            {showParamMenu ?  
                <form className="add-params-menu" onSubmit={onSubmit}>
                    <TextField className={classes.field} onChange={(e) => setTitle(e.target.value)} label="Parameter Set Title" variant="outlined" color="primary" fullWidth/>
                    
                    <Typography>Population Size</Typography>
                    <Slider
                        min={25}
                        max={250}
                        defaultValue={25}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={popSizeMarks}
                        onChangeCommitted={(e, value) => {setPopSize(value)}}
                    />                                        
                    <Typography>Number of Generations</Typography>
                    <Slider
                        min={10}
                        max={500}
                        defaultValue={10}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={simLengthMarks}
                        onChangeCommitted={(e, value) => {setSimLength(value)}}
                    />              
                    {/* <input type="submit" value="Save Parameter Set" className="btn btn-block"/> */}
                    <Button className={classes.button} type="submit" color="secondary" variant="contained">
                        Add Parameter Set
                    </Button>
                </form>
            : <></>}
        </Container>
    )
})

export default AddParamsMenu