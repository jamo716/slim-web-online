import { useContext } from "react"
import { AssortativeMatingContext } from "../context/AssortativeMatingContext"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import CsvDownloader from "react-csv-downloader"


const useStyles = makeStyles({
    root: {
        marginTop: 20,
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    }
})

const OutputElement = (({output}) => {
    const {renderGraph} = useContext(AssortativeMatingContext)
    const classes = useStyles()

    //array of header objects for columns of CSV output file
    const indHeaders = []

    //loop to add an header object for each individual's phenotypic value
    for(let i = 0; i < output.output[0].phenotypes.length; i++){
        indHeaders.push(
            {
                id: `ind${i + 1}`,
                displayName: `Ind ${i + 1}`
            }
        )
    }

    //final array of output headers including the generation
    var columns = [{id: "generation", displayName: "Generation"}, ...indHeaders]
    
    //array of data objects for output of phenotypic values and the generation in each row
    var datas = []

    for(let i = 0; i < output.output.length; i++){
        //output object that needs to be used for CSV output, one for each generation
        var objToAdd = {generation: output.output[i].generation}

        //add property to object, one for each phenotypic value
        for(let j = 0; j < output.output[i].phenotypes.length; j++){
            objToAdd = {...objToAdd, [`ind${j + 1}`]: output.output[i].phenotypes[j]}
        }
        
        datas.push(objToAdd)
    }

    return(
        <Container>
            <Card className={classes.root}>
                <CardHeader 
                    title={
                        <Typography variant="body1">
                            {output.title}
                        </Typography>
                    }
                />
                <CardActions>
                <Button size="small" color="primary" onClick={() => renderGraph(output.id)}>
                    Graph Output
                </Button>
                <CsvDownloader
                    filename={`assortative_${output.id}`}
                    extension=".csv"
                    separator=";"
                    wrapColumnChar="'"
                    columns={columns}
                    datas={datas}
                >
                    <Button>Download</Button>
                </CsvDownloader>
                </CardActions>
            </Card>
        </Container>
    )
})

export default OutputElement