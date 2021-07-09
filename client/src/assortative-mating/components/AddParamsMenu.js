import {useState, useContext} from "react"
import { AssortativeMatingContext } from "../context/AssortativeMatingContext"
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
        value: 500,
        label: '500',
    },
    {
        value: 750,
        label: '750',
    },
    {
        value: 1000,
        label: '1000',
    },
]

const assortStrMarks = [
    {
        value: 0.05,
        label: 'High',
    },
    {
        value: 0.25,
        label: 'Medium',
    },
    {
        value: 0.5,
        label: 'Low',
    },
]

const nQTLMarks = [
    {
        value: 5,
        label: '5',
    },
    {
        value: 10,
        label: '10',
    },
    {
        value: 15,
        label: '15',
    },
]

  const AddParamsMenu = (() => {
    const classes = useStyles()

    const {showParamMenu, addParamSet} = useContext(AssortativeMatingContext)

    const [title, setTitle] = useState("")
    const [popSize, setPopSize] = useState(500)
    const [assortStr, setAssortStr] = useState(0.05)
    const [nQTL, setNQTL] = useState(5)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title || !popSize){
            alert("Please supply values to all parameters.")
        }else{
            addParamSet({title, popSize, assortStr, nQTL})

            setTitle("")
            setPopSize(500)
            setAssortStr(0.05)
            setNQTL(5)
        }
    }

    return(
        <Container>
            {showParamMenu ?  
                <form className="add-params-menu" onSubmit={onSubmit}>
                    <TextField className={classes.field} onChange={(e) => setTitle(e.target.value)} label="Parameter Set Title" variant="outlined" color="primary" fullWidth/>
                    <Typography>Population Size</Typography>
                    <Slider
                        min={500}
                        max={1000}
                        defaultValue={500}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={popSizeMarks}
                        onChangeCommitted={(e, value) => {setPopSize(value)}}
                    />
                    <Typography>Strength of Assortative Mating</Typography>
                    <Slider
                        min={0.05}
                        max={0.5}
                        defaultValue={0.05}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={assortStrMarks}
                        onChangeCommitted={(e, value) => {setAssortStr(value)}}
                    />
                    <Typography>Number of QTL</Typography>
                    <Slider
                        min={5}
                        max={15}
                        defaultValue={5}
                        aria-labelledby="discrete-slider-custom"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={nQTLMarks}
                        onChangeCommitted={(e, value) => {setNQTL(value)}}
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