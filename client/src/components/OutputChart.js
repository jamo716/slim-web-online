import { LineChart, Line } from 'recharts'

const OutputChart = (({graphData}) => {
   
    const data = graphData.output
    //console.log(data)
    
    //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

    return(
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="mutCount" stroke="#8884d8" />
        </LineChart>
    )
})

export default OutputChart