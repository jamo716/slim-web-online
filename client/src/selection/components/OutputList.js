import {useContext} from "react"
import OutputElement from "./OutputElement"
import { SelectionContext } from "../context/SelectionContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import OutputRenderingCard from "./OutputRenderingCard"



const OutputList = (() => {
    const {outputs, isRendering} = useContext(SelectionContext)

    return(
        <Container>
            <Typography variant="h6">Outputs</Typography>
            <Grid container spacing={3}>
                {outputs.map((output) => (
                        <OutputElement key={`${output.id}-${output.run}`} output={output}/>
                ))}
                {isRendering ? <OutputRenderingCard/> : null}  
            </Grid>
        </Container>
    )
})

export default OutputList