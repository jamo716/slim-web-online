import {FaChartLine} from "react-icons/fa"
import { useContext } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"

const OutputElement = (({output}) => {
    const {renderGraph} = useContext(NeutralSimContext)

    return(
        <div className="output-element">
            <h3>
                {output.title}
                <FaChartLine className="icon" style={{color: "blue", cursor: "pointer"}} onClick={() => renderGraph(output.id)}/>
            </h3>
            <p>
                {output.id}
            </p>
        </div>
    )
})

export default OutputElement