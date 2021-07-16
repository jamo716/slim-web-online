import React from 'react'
import { makeStyles } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        marginTop: 20,
        height: 120
    },
    loader: {
        width: "80%",
        margin: "auto"
    }
})

const OutputRenderingCard = () => {

    const classes = useStyles()

    return (
        <Container>
            <Card className={classes.root}>
                <CardHeader
                    title={
                        <Typography variant="body1">
                            rendering...
                        </Typography>
                    }
                />
                <div className={classes.loader}>
                    <LinearProgress/>
                </div>
            </Card>
        </Container>
    )
}

export default OutputRenderingCard