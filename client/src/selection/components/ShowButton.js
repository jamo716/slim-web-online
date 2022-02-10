/*
The button component that hides/shows the parameter set entry menu.
*/

import { useContext } from "react"
import { SelectionContext } from "../context/SelectionContext"
import Button from "@material-ui/core/Button"

const ShowButton = (() => {

    const {toggleParamMenu} = useContext(SelectionContext)

    return(
        <header className="header">
            <Button color="primary" variant="contained" size="small" onClick={() => toggleParamMenu()}>Toggle Menu</Button>
        </header>
    )
})

export default ShowButton