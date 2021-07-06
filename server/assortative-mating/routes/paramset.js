import express from "express"
import paramsets from "../data/Paramsets.js"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//responds with full parameter set list
router.get("/:userid", (req, res) => {
    try {
        const userSets = paramsets.filter((paramset) => paramset.userID === parseInt(req.params.userid))
        res.status(200).json(userSets)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

//adds a new parameter set serverside
router.post("/", (req, res) => {
    const newParamset = {
      id: req.body.id,
      userID: parseInt(req.cookies.userID),
      title: req.body.title,
      popSize: parseInt(req.body.popSize),
      assortStr: parseFloat(req.body.assortStr),
      nQTL: parseInt(req.body.nQTL)
    }
  
    paramsets.push(newParamset)
    res.json(paramsets)
})

//deletes a parameter set
router.delete("/:id", (req, res) => {
    const found = paramsets.some((paramset) => paramset.id === parseInt(req.params.id))
  
    if(found){
        const filtered = paramsets.filter((paramset) => paramset.id !== parseInt(req.params.id))
        
        //clear out the paramSetList
        paramsets.splice(0, paramsets.length)
      
        //push the non-deleted elements back onto it
        for(let i = 0; i < filtered.length; i++){
            paramsets.push(filtered[i])
        }
        res.json(paramsets)
    }else{
      res.status(400).json({msg: "No parameter set with that id."})
    }
  })

export default router