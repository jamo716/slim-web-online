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

const DRAWER_WIDTH = 240

const useStyles = makeStyles({
    page: {
        background: "#f9f9f9",
        width: "100%"
    },
    drawer: {
        width: DRAWER_WIDTH
    },
    drawerPaper: {
        width: DRAWER_WIDTH
    },
    root: {
        display: "flex"
    },
    active: {
        background: "#f4f4f4"
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
            {/* side navigation drawer */}
            <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper}}>
                <div>
                    <Typography variant="h5">
                        SLiM Web
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
                {children}
            </div>
        </div>
    )
}

export default NavDrawer
