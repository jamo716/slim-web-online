import React, { useState } from 'react'
import { useHistory } from "react-router"
import clsx from "clsx"
import { CardActionArea, makeStyles } from '@material-ui/core'
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from "@material-ui/core/Collapse"

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight: 325
    },
    media: {
        height: 140
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      }
}))

const InfoCard = ({image, path, title, abstract}) => {

    const history = useHistory()
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push(path)}>
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
            <CardActions>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                      mollit anim id est laborum."
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default InfoCard
