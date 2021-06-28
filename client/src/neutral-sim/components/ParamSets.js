/*
Param sets component of web-app.
Displays the list of parameter sets stored in app global state.
*/

import {useContext} from "react"
import ParamSet from "./ParamSet"
import Paper from "@material-ui/core/Paper"
import { NeutralSimContext } from "../context/NeutralSimContext"

const ParamSets = (({onRetrieve}) => {
    const {paramSets} = useContext(NeutralSimContext)

    return(
        <>
            {paramSets.length > 0 ? 
                paramSets.map((paramSet) => {
                    return(
                        <Paper key={paramSet.id} elevation={3}>
                            <ParamSet paramSet={paramSet} onRetrieve={onRetrieve}/>
                        </Paper>
                    )
                })
            : <h4>Add a parameter set.</h4>}
        </> 
    )
})

export default ParamSets