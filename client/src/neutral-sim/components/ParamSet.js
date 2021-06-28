/*
A single parameter set component of the web-app.
Displays title of app and contains a button which opens and closes the menu for adding parameter sets.
Allows user to submit a parameter set to be rendered with submit button.
*/
import {useContext} from "react"
import {FaTimes, FaArrowCircleRight} from "react-icons/fa"
import { NeutralSimContext } from "../context/NeutralSimContext"

const ParamSet = (({paramSet, onDelete, onRetrieve}) => {

    const {deleteParamSet, renderParameterSet} = useContext(NeutralSimContext)

    return(
        <div className="param-set">
            <h3>
                {paramSet.title}
                    <div>
                        <FaTimes style={{color: "red", cursor: "pointer"}} onClick={() => deleteParamSet(paramSet.id)}/>
                        <FaArrowCircleRight style={{color: "green", cursor: "pointer"}} onClick={() => renderParameterSet(paramSet.id)}/>
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