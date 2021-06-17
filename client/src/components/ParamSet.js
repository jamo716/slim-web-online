/*
A single parameter set component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
Allows user to submit a parameter set to be rendered with submit button.
*/

import { useState } from "react"
import {FaTimes, FaArrowCircleRight} from "react-icons/fa"

const ParamSet = (({paramSet, onDelete, onRetrieve}) => {
    const [isRendering, setIsRendering] = useState(false)

    return(
        <div className="param-set">
            <h3>
                {paramSet.title}
                    <div>
                        <FaTimes style={{color: "red", cursor: "pointer"}} onClick={() => onDelete(paramSet.id)}/>
                        <FaArrowCircleRight style={{color: "green", cursor: "pointer"}} onClick={() => onRetrieve(paramSet.id)}/>
                    </div>
            </h3>
            <p>
                {paramSet.stabSelection}
                {paramSet.popSize}
            </p>
        </div>
    )
})

export default ParamSet