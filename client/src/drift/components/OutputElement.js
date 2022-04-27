import { useContext } from "react"
import { DriftContext } from "../context/DriftContext"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import CsvDownloader from "react-csv-downloader"
import IconButton from "@material-ui/core/IconButton"
import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }))

const OutputElement = (({output}) => {
    const {renderGraph, deleteOutput} = useContext(DriftContext)
    const classes = useStyles()

    const columns = [{
        id: 'generation',
        displayName: 'Generation'
      }, {
        id: 'fExp',
        displayName: 'F Expected'
      }, {
          id: 'fEst',
          displayName: 'F Estimated'
      }, {
        id: 'alleleFreq',
        displayName: 'Allele Frequency'
    },];

    const datas = output.output

    return(
        <Container>
            <Card
                className={classes.root}
            >
                <CardHeader
                    action={
                        <IconButton onClick={() => deleteOutput(output.id, output.run)}>
                            <DeleteOutlined/>
                        </IconButton>
                    } 
                    title={
                        <div>
                            <Typography variant="body1">
                                {`${output.title}`}
                            </Typography>
                            <Typography variant="overline">
                                {`Run ${output.run}`}
                            </Typography>
                        </div>
                    }
                />
                <CardActions>
                <Button size="small" color="primary" onClick={() => renderGraph(output.id, output.run)}>
                    Graph Output
                </Button>
                <CsvDownloader
                    filename={`selection_output_${output.id}`}
                    extension=".csv"
                    separator=","
                    columns={columns}
                    datas={datas}
                >
                    <Button>Export CSV</Button>
                </CsvDownloader>
                </CardActions>
            </Card>
        </Container>
    )
})

export default OutputElement