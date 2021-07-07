import React from 'react'
import { useHistory } from "react-router"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackOutlined from '@material-ui/icons/ArrowBackOutlined';

export const AssortativeMatingAbout = () => {

    const history = useHistory()

    return (
        <Container>
            <IconButton onClick={() => history.push("/assortativemating")}>
                <ArrowBackOutlined/>
            </IconButton>
            <Typography variant="h4">
                About the Assortative Mating Simulation
            </Typography>
        </Container>
    )
}

export default AssortativeMatingAbout