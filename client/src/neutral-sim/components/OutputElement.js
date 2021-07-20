import { useContext, useState } from "react"
import { NeutralSimContext } from "../context/NeutralSimContext"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from '@material-ui/core/CardActions'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import CsvDownloader from "react-csv-downloader"
import Popover from '@material-ui/core/Popover'
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
    const {renderGraph, deleteOutput} = useContext(NeutralSimContext)
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handlePopoverClose = () => {
      setAnchorEl(null)
    }
  
    const open = Boolean(anchorEl);

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
            <Card
                className={classes.root}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
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
                            <Typography variant="body2">
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
                    filename={`neutral_output_${output.id}`}
                    extension=".csv"
                    separator=","
                    columns={columns}
                    datas={datas}
                >
                    <Button>Export CSV</Button>
                </CsvDownloader>
                </CardActions>
            </Card>
            
            {/* popover text when hovering the output card */}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{`Population Size: ${output.popSize} Mutation Rate: ${output.mutRate}`}</Typography>
            </Popover>
        </Container>
    )
})

export default OutputElement