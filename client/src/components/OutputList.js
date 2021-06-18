import Paper from "@material-ui/core/Paper"
import OutputElement from "./OutputElement"

const OutputList = (({outputs}) => {
    return(
        <>
        {outputs.map((output) => {
            return(
                <Paper key={output.id} elevation={3}>
                    <OutputElement output={output}/>
                </Paper>
            )
        })}
        </> 
    )
})

//<OutputElement outputID={output.id}/>

export default OutputList