import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts'
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
                    <LineChart width={500} height={500} data={graphData}>
                        <Tooltip/>
                        <Line type="monotone" dataKey="mutCount" stroke="#00203FFF" activeDot={{ r: 8 }} />
                        <XAxis dataKey="generation" height={60}>
                            <Label value="Generation" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis dataKey="mutCount" label={{ value: 'Count of Mutations', angle: -90, position: 'insideLeft' }} height={10}/>
                    </LineChart>
                </div>
            : <></>}
        </Container>
    )
})

export default OutputChart