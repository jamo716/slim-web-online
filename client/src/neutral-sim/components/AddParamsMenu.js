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

const AddParamsMenu = (() => {
    const classes = useStyles()

    const {showParamMenu, addParamSet} = useContext(NeutralSimContext)

    const [title, setTitle] = useState("")
    const [mutRate, setMutRate] = useState(0)
    const [popSize, setPopSize] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title || !popSize){
            alert("Please supply values to all parameters.")
        }else{
            addParamSet({title, mutRate, popSize})

            setTitle("")
            setMutRate(0)
            setPopSize(0)
        }
    }

    return(
        <Container>
            {showParamMenu ?  
                <form className="add-params-menu" onSubmit={onSubmit}>
                    <TextField className={classes.field} onChange={(e) => setTitle(e.target.value)} label="Parameter Set Title" variant="outlined" color="primary" fullWidth/>
                    <TextField className={classes.field} onChange={(e) => setPopSize(e.target.value)} label="Population Size" variant="outlined" color="primary" fullWidth type="number"/>
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