import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import {useContext} from "react"
import { NeutralSimContext } from '../context/NeutralSimContext'

const OutputChart = (() => {
   
    const {graphData} = useContext(NeutralSimContext)

    return(
        <div>
            {graphData.length > 0 ? 
                <LineChart width={400} height={400} data={graphData}>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mutCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <XAxis dataKey="generation"/>
                    <YAxis dataKey="mutCount"/>
                </LineChart>
            : null}
        </div>
    )
})

export default OutputChart