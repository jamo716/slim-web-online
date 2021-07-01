import {useContext} from "react"
import OutputElement from "./OutputElement"
import { AssortativeMatingContext } from "../context/AssortativeMatingContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"


const OutputList = (() => {
    const {outputs} = useContext(AssortativeMatingContext)

    return(
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