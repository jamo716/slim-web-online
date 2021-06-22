import Paper from "@material-ui/core/Paper"
import OutputElement from "./OutputElement"

const OutputList = (({outputs, onGraph}) => {
    return(
        <>
        {outputs.map((output) => {
            return(
                <Paper key={output.id} elevation={3}>
                    <OutputElement output={output} onGraph={onGraph}/>
                </Paper>
            )
        })}
        </> 
    )
})

//<OutputElement outputID={output.id}/>

export default OutputList