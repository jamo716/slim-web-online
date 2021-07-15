import React from 'react'
import { useHistory } from "react-router"
import { CardActionArea, makeStyles } from '@material-ui/core'
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"

const useStyles = makeStyles({
    root:{
        minHeight: 300
    },
    media: {
        height: 140
    }
})

const InfoCard = ({image, title, abstract}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media} 
                    image={image}
                />
                <CardContent>
                    <Typography variant="h5">
                        {title} 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {abstract}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default InfoCard
