import {useState, useContext} from "react"
import { SelectionContext } from '../context/SelectionContext'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import { ButtonGroup } from '@material-ui/core'
import { Chart } from "react-google-charts";

const OutputChart = (() => {
    
    const {graphData, clearGraphData} = useContext(SelectionContext)
    const [buttonChoice, setButtonChoice] = useState(1);
    var data

    console.log(graphData)

    //changes array of objects into array of arrays that contain plotting values
    const convertDataForGraphAllele = (index) => {
        const data = [["Generation", "p", "q"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const p = graphData[0].data[i].p
            const q = graphData[0].data[i].q
            data.push([generation, p, q])
        }
        return data
    }

    const convertDataForGraphGenotype = (index) => {
        const data = [["Generation", "p2", "pq", "q2"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const p2 = graphData[0].data[i].p_2
            const pq = graphData[0].data[i].pq
            const q2 = graphData[0].data[i].q_2
            data.push([generation, p2, pq, q2])
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
        data = convertDataForGraphAllele(0)
    }else if(graphData.length > 0 & buttonChoice === 2){
        data = convertDataForGraphGenotype(0)
    }else if(graphData.length > 0 & buttonChoice === 3){
        data = convertDataForGraphFitness(0)
    }

    const optionsAllele = {
        title: "Allele Frequencies",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsGenotype = {
        title: "Genotype Frequencies",
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
                <Button onClick={() => setButtonChoice(1)}>Allele Frequencies</Button>
                <Button onClick={() => setButtonChoice(2)}>Genotype Frequencies</Button>
                <Button onClick={() => setButtonChoice(3)}>Mean Fitness</Button>
            </ButtonGroup>

            <div>
            {graphData.length > 0 & buttonChoice === 1 ? 
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsAllele}
                />
            : <></>}
            {graphData.length > 0 & buttonChoice === 2 ?
                
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsGenotype}
                />
                
                
            : <></>}
            {graphData.length > 0 & buttonChoice === 3 ? 
                
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