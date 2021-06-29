import {useContext} from "react"
import OutputElement from "./OutputElement"
import { NeutralSimContext } from "../context/NeutralSimContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"


const OutputList = (({onGraph}) => {
    const {outputs} = useContext(NeutralSimContext)

    return(
        // <>
        // {outputs.map((output) => {
        //     return(
        //         <Paper key={output.id} elevation={3}>
        //             <OutputElement output={output} onGraph={onGraph}/>
        //         </Paper>
        //     )
        // })}
        // </> 

        <Container>
            <Typography variant="h6">Outputs</Typography>
            <Grid container spacing={3}>
                {outputs.map((output) => (
                        <OutputElement key={output.id} output={output}/>
                ))}
            </Grid>
        </Container>
    )
})

//<OutputElement outputID={output.id}/>

export default OutputList