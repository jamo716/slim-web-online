/*
A single parameter set component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
Allows user to submit a parameter set to be rendered with submit button.
*/
import {useContext} from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Typography from "@material-ui/core/Typography"
import { DeleteOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    }
})

const ParamSet = (({paramSet}) => {

    const {deleteParamSet, renderParameterSet} = useContext(NeutralSimContext)

    const classes = useStyles()

    return(
        <Container>
            <Card className={classes.root}>
                <CardHeader 
                    action={
                        <IconButton onClick={() => deleteParamSet(paramSet.id)}>
                            <DeleteOutlined/>
                        </IconButton>
                    }
                    title={
                        <Typography variant="body1">
                            {paramSet.title}
                        </Typography>
                    }
                />
                <CardActions>
                <Button size="small" color="primary" onClick={() => renderParameterSet(paramSet.id)}>
                    Run Parameter Set
                </Button>
                </CardActions>
            </Card>
        </Container>
    )
})

export default ParamSet