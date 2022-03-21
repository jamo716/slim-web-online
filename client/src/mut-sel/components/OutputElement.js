import { useContext } from "react"
import { MutationSelectionContext } from "../context/MutationSelectionContext"
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
    const {renderGraph, deleteOutput} = useContext(MutationSelectionContext)
    const classes = useStyles()

    const columns = [{
        id: 'generation',
        displayName: 'Generation'
      }, {
        id: 'p1',
        displayName: 'p1'
      }, {
          id: 'q1',
          displayName: 'q1'
      }, {
        id: 'p2',
        displayName: 'p2'
    },{
        id: 'q2',
        displayName: 'q2'
    },{
        id: 'p3',
        displayName: 'p3'
    },{
        id: 'q3',
        displayName: 'q3'
    },{
        id: 'p4',
        displayName: 'p4'
    },{
        id: 'q4',
        displayName: 'q4'
    },{
        id: 'p5',
        displayName: 'p5'
    },{
        id: 'q5',
        displayName: 'q5'
    }, {
        id: 'w',
        displayName: 'w'
    }, {
        id: 'n_del',
        displayName: 'n_del'
    }, {
        id: 'freq_del',
        displayName: 'freq_del'
    },{
        id: 'shared',
        displayName: 'shared'
    },{
        id: 'unique',
        displayName: 'unique'
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