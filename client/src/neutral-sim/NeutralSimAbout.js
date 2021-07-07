import React from 'react'
import { useHistory } from "react-router"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackOutlined from '@material-ui/icons/ArrowBackOutlined';

export const NeutralSimAbout = () => {

    const history = useHistory()

    return (
        <Container>
            <IconButton onClick={() => history.push("/neutralsim")}>
                <ArrowBackOutlined/>
            </IconButton>
            <Typography variant="h4">
                About the Neutral Simulation
            </Typography>
        </Container>
    )
}

export default NeutralSimAbout