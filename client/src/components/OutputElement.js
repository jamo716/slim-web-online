import {FaChartLine} from "react-icons/fa"

const OutputElement = (({output, onGraph}) => {
    return(
        <div className="output-element">
            <h3>
                {output.title}

                <FaChartLine className="icon" style={{color: "blue", cursor: "pointer"}} onClick={() => onGraph(output.id)}/>
            </h3>
            <p>
                {output.id}
            </p>
        </div>
    )
})

export default OutputElement