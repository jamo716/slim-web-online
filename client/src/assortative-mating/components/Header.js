/*
The header component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
*/

import { useHistory } from "react-router"
import ShowButton from "./ShowButton"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import HelpIcon from "@material-ui/icons/Help"
import IconButton from "@material-ui/core/IconButton"

const Header = (() => {

    const history = useHistory()

    return(
        <Container>
            <header className="header">
                <Typography variant="h5">Assortative Mating</Typography>
                <IconButton color="primary" onClick={() => history.push("/")}>
                        <HelpIcon fontSize="large"/>
                    </IconButton>
            </header>
            <div>
                <div>
                    <ShowButton/>
                </div>
            </div>
        </Container>
    )
})

export default Header