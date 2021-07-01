/*
Param sets component of web-app.
Displays the list of parameter sets stored in app global state.
*/

import {useContext} from "react"
import Paramset from "./Paramset"
import { AssortativeMatingContext } from "../context/AssortativeMatingContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Container"

const Paramsets = (() => {
    const {paramSets} = useContext(AssortativeMatingContext)

    return(
        <Container>
            <Grid spacing={3}>
                {paramSets.map((paramSet) => (
                        <Paramset key={paramSet.id} paramSet={paramSet}/>
                ))}
            </Grid>
        </Container>
    )
})

export default Paramsets