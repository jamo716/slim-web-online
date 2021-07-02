import { useContext } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
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
    }
})

const OutputElement = (({output}) => {
    const {renderGraph} = useContext(NeutralSimContext)
    const classes = useStyles()

    const columns = [{
        id: 'generation',
        displayName: 'Generation'
      }, {
        id: 'mutCount',
        displayName: 'Count of Mutations'
      }];

    const datas = output.output

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
                    filename={`output_${output.id}`}
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