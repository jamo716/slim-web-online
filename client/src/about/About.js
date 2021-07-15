import React from 'react'
import { useHistory } from "react-router"
import { makeStyles } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackOutlined from '@material-ui/icons/ArrowBackOutlined';
import Grid from "@material-ui/core/Grid"
import InfoCard from "./components/InfoCard"

import NeutralImage from "./media/neutral.jpg"
import AssortativeImage from "./media/assortative.jpg"
import FillerImage from "./media/filler.jpg"

const useStyles = makeStyles({
  root: {
    marginTop: 30
  }
})

const infoCards = [
  {
    image: NeutralImage,
    title: "Neutral Simulation",
    abstract: "A simple simulation that demonstrates the phenomenon of mutation-drift balance in a randomly mating population.",
  },
  {
    image: AssortativeImage,
    title: "Assortative Mating Simulation",
    abstract: "A simulation that demonstrates how assortative mating increases genetic variance for a quantitative trait."
  },
  {
    image: FillerImage,
    title: "Another Simulation",
    abstract: "This is the abstract for another simulation"
  }
]

export const NeutralSimAbout = () => {

    const history = useHistory()
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
              {
                infoCards.map(infoCard => {
                  return(
                    <Grid key={infoCard.title} item xs={4}>
                      <InfoCard image={infoCard.image} title={infoCard.title} abstract={infoCard.abstract}/>
                    </Grid>
                  )
                })
              }
            </Grid>
        </Container>
    )
}

export default NeutralSimAbout