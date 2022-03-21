/*
A single parameter set component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
Allows user to submit a parameter set to be rendered with submit button.
*/
import {useContext, useState} from "react"
import { MutationSelectionContext } from "../context/MutationSelectionContext"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Typography from "@material-ui/core/Typography"
import { DeleteOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import Popover from '@material-ui/core/Popover'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }))

const ParamSet = (({paramSet}) => {

    const {deleteParamSet, renderParameterSet, isRendering} = useContext(MutationSelectionContext)

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handlePopoverClose = () => {
      setAnchorEl(null)
    }
  
    const open = Boolean(anchorEl);

    return(
        <Container>
            <Card
                className={classes.root}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <CardHeader 
                    action={
                        <IconButton onClick={() => deleteParamSet(paramSet.id)}>
                            <DeleteOutlined/>
                        </IconButton>
                    }
                    title={
                        <div>
                            <Typography variant="body1">
                                {paramSet.title}
                            </Typography>
                            <Typography variant="overline">
                                {`${paramSet.simLength} generations`}
                            </Typography>
                        </div>
                    }
                />
                <CardActions>
                <Button size="small" color="primary" onClick={() => renderParameterSet(paramSet.id)} disabled={isRendering ? true : false}>
                    Run Parameter Set
                </Button>
                </CardActions>
            </Card>

            {/* popover text when hovering the parameter set card */}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{`Dominance Coefficient: ${paramSet.h} Selection Coefficient: ${paramSet.s} Forward Rate: ${paramSet.fr} Backward Rate: ${paramSet.br}`}</Typography>
            </Popover>
        </Container>
    )
})

export default ParamSet