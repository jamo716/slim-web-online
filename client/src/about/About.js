import React from 'react'
import { makeStyles } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import InfoCard from "./components/InfoCard"

import NeutralImage from "./media/neutral.jpg"
import AssortativeImage from "./media/assortative.jpg"
//import FillerImage from "./media/filler.jpg"
import MutationImage from "./media/mutation.jpeg"
import SelectionImage from "./media/selection.jpeg"
import BalanceImage from "./media/balance.jpeg"
import DriftImage from "./media/drift.jpeg"

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
    abstract: "A two allele model of mutation."
  },
  {
    image: SelectionImage,
    path: "/selection",
    title: "Simple Selection Model",
    abstract: "A two allele model of selection."
  },
  {
    image: BalanceImage,
    path: "/mutationselection",
    title: "Mutation-Selection Balance",
    abstract: "A two allele model of mutation and selection."
  },
  {
    image: DriftImage,
    path: "/drift",
    title: "Genetic Drift",
    abstract: "A simulation of genetic drift."
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