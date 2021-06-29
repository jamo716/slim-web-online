import { useContext } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    }
})

const OutputElement = (({output}) => {
    const {renderGraph} = useContext(NeutralSimContext)
    const classes = useStyles()

    return(
        // <div className="output-element">
        //     <h3>
        //         {output.title}
        //         <FaChartLine className="icon" style={{color: "blue", cursor: "pointer"}} onClick={() => renderGraph(output.id)}/>
        //     </h3>
        //     <p>
        //         {output.id}
        //     </p>
        // </div>

        <Container>
            <Card className={classes.root}>
                <CardHeader 
                    title={
                        <Typography variant="body1">
                            {output.title}
                        </Typography>
                    }
                />
                <CardActions>
                <Button size="small" color="primary" onClick={() => renderGraph(output.id)}>
                    Graph Output
                </Button>
                </CardActions>
            </Card>
        </Container>
    )
})

export default OutputElement