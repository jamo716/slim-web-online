import express from "express"
import cookieParser from "cookie-parser"
import Mut_Paramset from "../models/paramset.js"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

router.get("/:userid", (req, res) => {
    try {
      Mut_Paramset.find({userID: parseInt(req.params.userid)})
        .then(paramsets => {
          res.status(200).json(paramsets)
        })
  
      // const userSets = paramsets.filter((paramSet) => paramSet.userID === parseInt(req.params.userid))
      // res.status(200).json(userSets)
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  })

  //adds a new parameter set serverside
router.post("/", (req, res) => {
  const newParamSet = new Mut_Paramset({
    id: req.body.id,
    userID: parseInt(req.cookies.userID),
    title: req.body.title,
    fr: parseFloat(req.body.fr),
    br: parseFloat(req.body.br),
    pInit: parseFloat(req.body.pInit),
    simLength: parseInt(req.body.simLength)
  })

  newParamSet.save()
    .then(paramset => {
      res.status(200).json(paramset)
    })
})

//deletes a parameter set
router.delete("/:id", (req, res) => {
  try {
    Mut_Paramset.findOneAndDelete({id: parseInt(req.params.id)})
      .then(paramset => {
        res.status(200).json(paramset)
      })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

  export default router