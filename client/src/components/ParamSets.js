/*
Param sets component of web-app.
Displays the list of parameter sets stored in app global state.
*/

import ParamSet from "./ParamSet"
import Paper from "@material-ui/core/Paper"
import CircularProgress from "@material-ui/core/CircularProgress"

const ParamSets = (({paramSets, onDelete, onRetrieve}) => {
    return(
        <>
        {paramSets.map((paramSet) => {
            return(
                <Paper key={paramSet.id} elevation={3}>
                    <ParamSet  paramSet={paramSet} onDelete={onDelete} onRetrieve={onRetrieve}/>
                </Paper>
                
            )
        })}
        </> 
    )
})

export default ParamSets