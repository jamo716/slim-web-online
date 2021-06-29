/*
The button component that hides/shows the parameter set entry menu.
*/

import { useContext } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
import Button from "@material-ui/core/Button"

const ShowButton = (() => {

    const {toggleParamMenu} = useContext(NeutralSimContext)

    return(
        <header className="header">
            <Button color="primary" variant="contained" size="small" onClick={() => toggleParamMenu()}>Toggle Menu</Button>
        </header>
    )
})

export default ShowButton