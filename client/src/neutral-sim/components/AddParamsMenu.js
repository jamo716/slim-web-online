/*
The parameter set menu component of the web-app.
Allows user to input parameter values and then submit them to the paramSets global state.
*/

import {useState, useContext} from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
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
        value: 1000,
        label: '1000',
    },
    {
        value: 2000,
        label: '2000',
    },
    {
        value: 5000,
        label: '5000'
    },
    {
        value: 7500,
        label: "7500"
    },
    {
        value: 10000,
        label: "10000"
    }
]

const simLengthMarks = [
    {
        value: 2000,
        label: "2000"
    },
    {
        value: 5000,
        label: "5000"
    },
    {
        value: 10000,
        label: "10000"
    }
]

const AddParamsMenu = (() => {
    const classes = useStyles()

    //functions and global state from context API
    const {showParamMenu, addParamSet} = useContext(NeutralSimContext)

    //state for addition of new parameter sets
    const [title, setTitle] = useState("")
    const [mutRate, setMutRate] = useState(0)
    const [popSize, setPopSize] = useState(500)
    const [simLength, setSimLength] = useState(2000)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title || !popSize){
            alert("Please supply values to all parameters.")
        }else{
            addParamSet({title, mutRate, popSize, simLength})

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
                        min={1000}
                        max={10000}
                        defaultValue={1000}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={popSizeMarks}
                        onChangeCommitted={(e, value) => {setPopSize(value)}}
                    />                    
                    <Typography>Mutation Rate</Typography>
                    <Slider
                        defaultValue={0.00000000}
                        aria-labelledby="discrete-slider-small-steps"
                        step={0.00000001}
                        marks
                        min={0.0}
                        max={0.0000001}
                        valueLabelDisplay="auto"
                        onChangeCommitted={(e, value) => {setMutRate(value)}}
                    />
                    <Typography>Number of Generations</Typography>
                    <Slider
                        min={2000}
                        max={10000}
                        defaultValue={2000}
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