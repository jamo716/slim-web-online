/*
The header component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
*/

import ShowButton from "./ShowButton"

const Header = (({onToggle}) => {
    return(
        <header className="header">
            <h1>SLiM Web</h1>
            <ShowButton onToggle={onToggle}/>
        </header>
    )
})

export default Header