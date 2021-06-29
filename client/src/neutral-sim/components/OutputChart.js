import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import {useContext} from "react"
import { NeutralSimContext } from '../context/NeutralSimContext'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'

const OutputChart = (() => {
   
    const {graphData} = useContext(NeutralSimContext)

    return(
        <Container>
            {graphData.length > 0 ? 
                <div>
                    <Typography variant="h6">{`Output Chart`}</Typography>
                    <LineChart width={400} height={400} data={graphData}>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="mutCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <XAxis dataKey="generation"/>
                        <YAxis dataKey="mutCount"/>
                    </LineChart>
                </div>
            : <></>}
        </Container>
    )
})

export default OutputChart