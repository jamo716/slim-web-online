import {useContext, useState} from "react"
import { AssortativeMatingContext } from '../context/AssortativeMatingContext'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Chart from "react-google-charts";
import Slider from "@material-ui/core/Slider"

const generationMarks = [
    {
        value: 0,
        label: '1',
    },
    {
        value: 1,
        label: '10',
    },
    {
        value: 2,
        label: '20',
    },
    {
        value: 3,
        label: '30',
    },
    {
        value: 4,
        label: '40',
    },
    {
        value: 5,
        label: '50',
    },
    {
        value: 6,
        label: '60',
    },
    {
        value: 7,
        label: '70',
    },
    {
        value: 8,
        label: '80',
    },
    {
        value: 9,
        label: '90',
    },
    {
        value: 10,
        label: '100',
    },
    {
        value: 11,
        label: '110',
    },
    {
        value: 12,
        label: '120',
    },
    {
        value: 13,
        label: '130',
    },
    {
        value: 14,
        label: '140',
    },
    {
        value: 15,
        label: '150',
    },
    {
        value: 16,
        label: '160',
    },
    {
        value: 17,
        label: '170',
    },
    {
        value: 18,
        label: '180',
    },
    {
        value: 19,
        label: '190',
    },
    {
        value: 20,
        label: '200',
    }
]

const HistogramChart = (() => {
   
    const {graphData} = useContext(AssortativeMatingContext)
    const [generationIndex, setGenerationIndex] = useState(0)

    //takes an index which relates to a generation to display in the histogram
    const convertDataForGraph = (index) => {
        const data = [["Individual", "Phenotypic Value"]]
        for(let i = 0; i < graphData[index].phenotypes.length; i++){
            const phenotypeAtIndex = graphData[index].phenotypes[i]
            data.push([`Ind ${i}`, phenotypeAtIndex])
        }
        return data
    }

    if(graphData.length > 0){
        var data = convertDataForGraph(generationIndex)
    }

    return(
        <Container>
            {graphData.length > 0 ? 
                <div>
                    <Typography variant="h6">{`Select a Generation`}</Typography>
                    <Slider
                        defaultValue={0}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks={generationMarks}
                        min={0}
                        max={20}
                        valueLabelDisplay="auto"
                        onChangeCommitted={(e, value) => {setGenerationIndex(value)}}
                    />
                    <Chart
                        width={'500px'}
                        height={'500px'}
                        chartType="Histogram"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={{
                            colors: ["#2B274E"],
                            hAxis: {
                                title: 'Phenotypic Value'
                            },
                            vAxis: {
                                title: "Count"
                            },
                            title: `Distribution of Phenotypic Values for Generation ${generationIndex === 0 ? "1" : generationIndex*10}`,
                            legend: { position: 'none' },
                            histogram: {
                                bucketSize: 1
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            : <></>}
        </Container>
    )
})

export default HistogramChart