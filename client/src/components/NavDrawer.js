import React from 'react'
import {useHistory, useLocation} from "react-router"
import {makeStyles} from "@material-ui/core"
import ComputerIcon from '@material-ui/icons/Computer';
import InfoIcon from '@material-ui/icons/Info';
import Drawer from "@material-ui/core/Drawer"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import SlimIcon from "./media/SLiM_256.jpeg"

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`
        },
        drawer: {
            width: DRAWER_WIDTH,
            
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
            backgroundColor: "lightgrey"
        },
        root: {
            display: "flex"
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

    const pages = [
        {
            text: "Neutral Simulation",
            icon: <ComputerIcon color="primary"/>,
            path: "/neutralsim"
        },
        {
            text: "About",
            icon: <InfoIcon color="primary"/>,
            path: "/about"
        }
    ]

    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar className={classes.appbar} elevation={1}>
                <ToolBar>
                    <Avatar alt="SLiM Icon" src={SlimIcon} variant="square" className={classes.icon}/>
                    <Typography>
                        SLiM Web
                    </Typography>
                </ToolBar>
            </AppBar>

            {/* side navigation drawer */}
            <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper}}>
                <div>
                    <Typography variant="h6" className={classes.title}>
                        Navigation
                    </Typography>
                </div>
                {/* list of links to pages on site */}
                <List>
                    {pages.map(page => (
                        <ListItem button key={page.text} onClick={() => history.push(page.path)} className={location.pathName === page.path ? classes.active : null}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.text}/>
                        </ListItem>
                    ))}

                </List>
            </Drawer>

            <div>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default NavDrawer
