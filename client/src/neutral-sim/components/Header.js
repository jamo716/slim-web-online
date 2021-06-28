/*
The header component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
*/

import ShowButton from "./ShowButton"

const Header = (() => {
    return(
        <header className="header">
            <h1>Neutral Simulation</h1>
            <ShowButton/>
        </header>
    )
})

export default Header