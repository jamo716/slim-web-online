import React from 'react'
import { makeStyles } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import InfoCard from "./components/InfoCard"

import NeutralImage from "./media/neutral.jpg"
import AssortativeImage from "./media/assortative.jpg"
import FillerImage from "./media/filler.jpg"
import MutationImage from "./media/mutation.jpeg"
import SelectionImage from "./media/selection.jpeg"

const useStyles = makeStyles({
  root: {
    marginTop: 30
  }
})

const infoCards = [
  {
    image: NeutralImage,
    path: "/neutralsim",
    title: "Neutral Simulation",
    abstract: "A simple simulation that demonstrates the phenomenon of mutation-drift balance in a randomly mating population.",
  },
  {
    image: AssortativeImage,
    path: "/assortativemating",
    title: "Assortative Mating Simulation",
    abstract: "A simulation that demonstrates how assortative mating increases genetic variance for a quantitative trait."
  },
  {
    image: MutationImage,
    path: "/mutation",
    title: "Simple Mutation Model",
    abstract: "This is the abstract for another simulation"
  },
  {
    image: SelectionImage,
    path: "/selection",
    title: "Simple Selection Model",
    abstract: "This is the abstract for another simulation"
  },
  {
    image: FillerImage,
    path: "/mutationselection",
    title: "Mutation-Selection Balance",
    abstract: "This is the abstract for another simulation"
  },
  {
    image: FillerImage,
    path: "/",
    title: "Sixth Simulation",
    abstract: "This is the abstract for another simulation"
  }
]

export const NeutralSimAbout = () => {

    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
              {
                infoCards.map(infoCard => {
                  return(
                    <Grid key={infoCard.title} item xs={4}>
                      <InfoCard image={infoCard.image} path={infoCard.path} title={infoCard.title} abstract={infoCard.abstract}/>
                    </Grid>
                  )
                })
              }
            </Grid>
        </Container>
    )
}

export default NeutralSimAbout