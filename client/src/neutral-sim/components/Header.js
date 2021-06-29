/*
The header component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
*/

import ShowButton from "./ShowButton"
import Typography from "@material-ui/core/Typography"

const Header = (() => {
    return(
        <header className="header">
            <Typography variant="h5">Neutral Simulation</Typography>
            <ShowButton/>
        </header>
    )
})

export default Header