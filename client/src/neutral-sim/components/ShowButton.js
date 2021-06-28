/*
The button component that hides/shows the parameter set entry menu.
*/

import { useContext } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"

const ShowButton = (() => {

    const {toggleParamMenu} = useContext(NeutralSimContext)

    return(
        <header className="header">
            <button className="btn" onClick={() => toggleParamMenu()}>Toggle Parameters Menu</button>
        </header>
    )
})

export default ShowButton