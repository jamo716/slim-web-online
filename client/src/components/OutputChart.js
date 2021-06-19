import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const OutputChart = (({graphData}) => {
   
    const data = graphData.output
    //console.log(data)
    
    //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

    return(
        <LineChart width={400} height={400} data={data}>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mutCount" stroke="#8884d8" activeDot={{ r: 8 }} />
            <XAxis dataKey="generation"/>
            <YAxis dataKey="mutCount"/>
        </LineChart>
    )
})

export default OutputChart