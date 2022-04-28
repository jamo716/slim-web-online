import React, {useState} from 'react'
import {useHistory, useLocation} from "react-router"
import {makeStyles} from "@material-ui/core"
import ComputerIcon from '@material-ui/icons/Computer';
import InfoIcon from '@material-ui/icons/Info';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import SlimIcon from "./media/SLiM_256.jpeg"
import Divider from "@material-ui/core/Divider"
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu"

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            // width: `calc(100% - ${DRAWER_WIDTH}px)`
        },
        drawer: {
            width: DRAWER_WIDTH,
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
            backgroundColor: "#ADEFD1FF"
        },
        active: {
            background: "#f4f4f4"
        },
        title: {
            padding: theme.spacing(2)
        },
        toolbar: theme.mixins.toolbar,
        icon: {
            marginRight: 20
        }
    }
})

export const NavDrawer = ({children}) => {

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [open, setOpen] = useState(false)

    const pages = [
        {
            text: "About The Simulations",
            icon: <InfoIcon />,
            path: "/"
        },
        {
            text: "Neutral Simulation",
            icon: <ComputerIcon color="primary"/>,
            path: "/neutralsim"
        },
        {
            text: "Assortative Mating",
            icon: <ComputerIcon color="primary"/>,
            path: "/assortativemating"
        },
        {
            text: "Simple Mutation Model",
            icon: <ComputerIcon color="primary"/>,
            path: "/mutation"
        },
        {
            text: "Simple Selection Model",
            icon: <ComputerIcon color="primary"/>,
            path: "/selection"
        },
        {
            text: "Mutation-Selection Balance",
            icon: <ComputerIcon color="primary"/>,
            path: "/mutationselection"
        },
        {
            text: "Genetic Drift",
            icon: <ComputerIcon color="primary"/>,
            path: "/drift"
        },
    ]

    return (
        <div className="root">
            {/* app bar */}
            <AppBar className={classes.appbar} elevation={1}>
                <ToolBar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setOpen(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Avatar alt="SLiM Icon" src={SlimIcon} variant="square" className={classes.icon}/>
                    <Typography>
                        SLiM Web
                    </Typography>
                </ToolBar>
            </AppBar>

            {/* side navigation drawer */}
            <SwipeableDrawer className={classes.drawer} open={open} anchor="left" classes={{paper: classes.drawerPaper}} onClose={() => setOpen(false)} onOpen={() => {}}>
                <div>
                    <Typography variant="h6" className={classes.title}>
                        Navigation
                    </Typography>
                    <Divider/>
                </div>

                {/* list of links to pages on site */}
                {/* drawer closes on click of any list items */}
                <div onClick={() => setOpen(false)}>
                    <List>
                        {pages.map(page => (
                            <ListItem button key={page.text} onClick={() => history.push(page.path)} className={location.pathName === page.path ? classes.active : null}>
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <ListItemText primary={page.text}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>

            <div>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default NavDrawer
