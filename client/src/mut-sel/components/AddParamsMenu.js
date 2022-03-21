/*
The parameter set menu component of the web-app.
Allows user to input parameter values and then submit them to the paramSets global state.
*/

import {useState, useContext} from "react"
import { MutationSelectionContext } from "../context/MutationSelectionContext"
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

const rateMarks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 0.1,
        label: '0.1',
    },
    {
        value: 0.2,
        label: '0.2'
    },
    {
        value: 0.3,
        label: "0.3"
    },
    {
        value: 0.4,
        label: "0.4"
    },
    {
        value: 0.5,
        label: "0.5"
    },
    {
        value: 0.6,
        label: "0.6"
    },
    {
        value: 0.7,
        label: "0.7"
    },
    {
        value: 0.8,
        label: "0.8"
    },
    {
        value: 0.9,
        label: "0.9"
    },
    {
        value: 1,
        label: "1"
    }
]

const popSizeMarks = [
    {
        value: 500,
        label: "500"
    },
    {
        value: 1000,
        label: "1000"
    },
    {
        value: 10000,
        label: "10000"
    }
]

const simLengthMarks = [
    {
        value: 10,
        label: "10"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 30,
        label: "30"
    }
]

const AddParamsMenu = (() => {
    const classes = useStyles()

    //functions and global state from context API
    const {showParamMenu, addParamSet} = useContext(MutationSelectionContext)

    //state for addition of new parameter sets
    const [title, setTitle] = useState("")
    const [h, setH] = useState(0)
    const [s, setS] = useState(0)
    const [fr, setFr] = useState(0)
    const [br, setBr] = useState(0)
    const [pInit, setPInit] = useState(0)
    const [popSize, setPopSize] = useState(500)
    const [simLength, setSimLength] = useState(10)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert("Please supply values to all parameters.")
        }else{
            addParamSet({title, pInit, h, s, fr, br, popSize, simLength})

            setTitle("")
        }
    }

    return(
        <Container>
            {showParamMenu ?  
                <form className="add-params-menu" onSubmit={onSubmit}>
                    <TextField className={classes.field} onChange={(e) => setTitle(e.target.value)} label="Parameter Set Title" variant="outlined" color="primary" fullWidth/>
                    <Typography>Initial Frequency of A Allele</Typography>
                    <Slider
                        min={0}
                        max={1}
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={rateMarks}
                        onChangeCommitted={(e, value) => {setPInit(value)}}
                    />       
                    <Typography>Dominance Coefficient</Typography>
                    <Slider
                        min={0}
                        max={1}
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={rateMarks}
                        onChangeCommitted={(e, value) => {setH(value)}}
                    />                    
                    <Typography>Selection Coefficient</Typography>
                    <Slider
                        min={0}
                        max={1}
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={rateMarks}
                        onChangeCommitted={(e, value) => {setS(value)}}
                    />
                    <Typography>Forward Rate of Mutation</Typography>
                    <Slider
                        min={0}
                        max={1}
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={rateMarks}
                        onChangeCommitted={(e, value) => {setFr(value)}}
                    />                    
                    <Typography>Backward Rate of Mutation</Typography>
                    <Slider
                        min={0}
                        max={1}
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={rateMarks}
                        onChangeCommitted={(e, value) => {setBr(value)}}
                    />
                    <Typography>Population Size</Typography>
                    <Slider
                        min={500}
                        max={10000}
                        defaultValue={500}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={popSizeMarks}
                        onChangeCommitted={(e, value) => {setPopSize(value)}}
                    />                                        
                    <Typography>Number of Generations</Typography>
                    <Slider
                        min={10}
                        max={30}
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