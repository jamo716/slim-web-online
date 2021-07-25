import express from "express"
import cookieParser from "cookie-parser"
import Assort_Paramset from "../models/paramset.js"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//responds with full parameter set list
router.get("/:userid", (req, res) => {
  try {
    Assort_Paramset.find({userID: parseInt(req.params.userid)})
      .then(paramsets => {
        res.status(200).json(paramsets)
      })
  } catch (error) {
      res.status(404).json({message: error.message})
  }
})

//adds a new parameter set serverside
router.post("/", (req, res) => {
  const newParamset = new Assort_Paramset({
    id: req.body.id,
    userID: parseInt(req.cookies.userID),
    title: req.body.title,
    popSize: parseInt(req.body.popSize),
    assortStr: parseFloat(req.body.assortStr),
    nQTL: parseInt(req.body.nQTL)
  })

  newParamset.save()
    .then(paramset => {
      res.status(200).json(paramset)
    })
})

//deletes a parameter set
router.delete("/:id", (req, res) => {
  try {
    Assort_Paramset.findOneAndDelete({id: parseInt(req.params.id)})
      .then(paramset => {
        res.status(200).json(paramset)
      })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

export default router