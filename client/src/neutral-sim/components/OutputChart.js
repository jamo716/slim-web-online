import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from 'recharts'
import {useContext} from "react"
import { NeutralSimContext } from '../context/NeutralSimContext'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"

const OutputChart = (() => {
    
    const {graphData, clearGraphData} = useContext(NeutralSimContext)

    return(
        <Container>
            {graphData.length > 0 ? 
                <div>
                    <Typography variant="h6">{`Output Chart`}</Typography>
                    <LineChart width={500} height={500} data={graphData}>
                        <Tooltip/>
                        {
                            graphData.map(d => (
                                <Line dataKey="mutCount" data={d.data} name={`${d.name} Run ${d.run}`} key={`${d.name}_${d.run}`} stroke={"#" + Math.floor(Math.random()*16777215).toString(16)}/>
                            ))
                        }
                        <XAxis dataKey="generation" height={60} allowDuplicatedCategory={false}>
                            <Label value="Generation" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis dataKey="mutCount" label={{ value: 'Count of Mutations', angle: -90, position: 'insideLeft' }} height={10}/>
                    </LineChart>
                    <Button color="secondary" variant="contained" onClick={() => clearGraphData()}>Clear Data</Button>
                </div>
            : <></>}
        </Container>
    )
})

export default OutputChart