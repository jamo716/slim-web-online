import {useState, useContext} from "react"
import { MutationSelectionContext } from '../context/MutationSelectionContext'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import { ButtonGroup } from '@material-ui/core'
import { Chart } from "react-google-charts";

const OutputChart = (() => {
    
    const {graphData, clearGraphData} = useContext(MutationSelectionContext)
    const [buttonChoice, setButtonChoice] = useState(1);
    var data

    console.log(graphData)

    //changes array of objects into array of arrays that contain plotting values
    const convertDataForGraphAllele = (index) => {
        const data = [["Generation", "p1", "p2", "p3", "p4", "p5"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const p1 = graphData[0].data[i].p1
            const p2 = graphData[0].data[i].p2
            const p3 = graphData[0].data[i].p3
            const p4 = graphData[0].data[i].p4
            const p5 = graphData[0].data[i].p5
            data.push([generation, p1, p2, p3, p4, p5])
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

    const convertDataForNDel = (index) => {
        const data = [["Generation", "n_del"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const n_del = graphData[0].data[i].n_del
            data.push([generation, n_del])
        }
        return data
    }

    const convertDataForDelFreq = (index) => {
        const data = [["Generation", "freq_del"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const freq_del = graphData[0].data[i].freq_del
            data.push([generation, freq_del])
        }
        return data
    }

    const convertDataForSharedUnique = (index) => {
        const data = [["Generation", "shared", "unique"]]
        for(let i = 0; i < graphData[0].data.length; i++){
            const generation = graphData[0].data[i].generation
            const shared = graphData[0].data[i].shared
            const unique = graphData[0].data[i].unique
            data.push([generation, shared, unique])
        }
        return data
    }


    if(graphData.length > 0 & buttonChoice === 1){
        data = convertDataForGraphAllele(0)
    }
    else if(graphData.length > 0 & buttonChoice === 2){
        data = convertDataForGraphFitness(0)
    }
    else if(graphData.length > 0 & buttonChoice === 3){
        data = convertDataForNDel(0)
    }
    else if(graphData.length > 0 & buttonChoice === 4){
        data = convertDataForDelFreq(0)
    }
    else if(graphData.length > 0 & buttonChoice === 5){
        data = convertDataForSharedUnique(0)
    }

    const optionsAllele = {
        title: "Allele Frequencies",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsFitness = {
        title: "Mean Fitness",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsNDel= {
        title: "Average Number of Deleterious Mutations",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsDelFreq= {
        title: "Average Frequency of Deleterious Mutations",
        curveType: "function",
        legend: { position: "bottom" },
      };

      const optionsSharedUnique= {
        title: "Average Counts of Shared and Unique Mutations",
        curveType: "function",
        legend: { position: "bottom" },
      };

    return(
        <Container>
            <Typography variant="h6">{`Output Chart`}</Typography>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => setButtonChoice(1)}>Allele Frequencies</Button>
                <Button onClick={() => setButtonChoice(2)}>Fitness</Button>
                <Button onClick={() => setButtonChoice(3)}>Count of Deleterious Mutations</Button>
                <Button onClick={() => setButtonChoice(4)}>Freq. of Deleterious Mutations</Button>
                <Button onClick={() => setButtonChoice(5)}>Shared/Unique</Button>
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
                    options={optionsFitness}
                />
            : <></>}
            {graphData.length > 0 & buttonChoice === 3 ? 
                
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsNDel}
                />
                
            : <></>}
            {graphData.length > 0 & buttonChoice === 4 ? 
                
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsDelFreq}
                />
                
            : <></>}
            {graphData.length > 0 & buttonChoice === 5 ? 
                
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={optionsSharedUnique}
                />
                
            : <></>}
            <Button color="secondary" variant="contained" onClick={() => clearGraphData()}>Clear Data</Button>
            </div>
        </Container>
    )
})

export default OutputChart