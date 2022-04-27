import {useState, useContext} from "react"
import { DriftContext } from "../context/DriftContext"
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import { ButtonGroup } from '@material-ui/core'
import { Chart } from "react-google-charts";

const OutputChart = (() => {
    
    const {graphData, clearGraphData} = useContext(DriftContext)
    const [buttonChoice, setButtonChoice] = useState(1);
    var data

    console.log(graphData)

    //changes array of objects into array of arrays that contain plotting values
    const convertDataForGraphF = (index) => {
        const data = [["Generation", "Expected F", "Estimated F"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const fExp = graphData[0].data[i].fExp
            const fEst = graphData[0].data[i].fEst
            data.push([generation, fExp, fEst])
        }
        return data
    }

    const convertDataForGraphFitness = (index) => {
        const data = [["Generation", "w"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const w = graphData[0].data[i].w
            data.push([generation, w])
        }
        return data
    }

    if(graphData.length > 0 & buttonChoice === 1){
        data = convertDataForGraphF(0)
    }
    else if(graphData.length > 0 & buttonChoice === 2){
        data = convertDataForGraphFitness(0)
    }
   
    const optionsF = {
        title: "Expected vs Estimated Values of F",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsFitness = {
        title: "Mean Fitness",
        curveType: "function",
        legend: { position: "bottom" },
      };

    return(
        <Container>
            <Typography variant="h6">{`Output Chart`}</Typography>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => setButtonChoice(1)}>F - Expected vs Estimated</Button>
                <Button onClick={() => setButtonChoice(2)}>Allele Frequencies</Button>
            </ButtonGroup>

            <div>
            {graphData.length > 0 & buttonChoice === 1 ? 
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsF}
                />
            : <></>}
            {graphData.length > 0 & buttonChoice === 2 ?
                
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsFitness}
                />
            : <></>}
            <Button color="secondary" variant="contained" onClick={() => clearGraphData()}>Clear Data</Button>
            </div>
        </Container>
    )
})

export default OutputChart