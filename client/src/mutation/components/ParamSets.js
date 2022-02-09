/*
Param sets component of web-app.
Displays the list of parameter sets stored in app global state.
*/

import {useContext} from "react"
import ParamSet from "./ParamSet"
import { MutationContext } from "../context/MutationContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Container"

const ParamSets = (() => {
    const {paramSets} = useContext(MutationContext)

    return(
        <Container>
            <Grid spacing={3}>
                {paramSets.map((paramSet) => (
                        <ParamSet key={paramSet.id} paramSet={paramSet}/>
                ))}
            </Grid>
        </Container>
    )
})

export default ParamSets