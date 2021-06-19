/*
The button component that hides/shows the parameter set entry menu.
*/

const ShowButton = (({onToggle}) => {
    return(
        <header className="header">
            <button className="btn" onClick={onToggle}>Toggle Parameters Menu</button>
        </header>
    )
})

export default ShowButton