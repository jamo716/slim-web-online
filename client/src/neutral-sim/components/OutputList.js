import {useContext} from "react"
import Paper from "@material-ui/core/Paper"
import OutputElement from "./OutputElement"
import { NeutralSimContext } from "../context/NeutralSimContext"


const OutputList = (({onGraph}) => {
    const {outputs} = useContext(NeutralSimContext)

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