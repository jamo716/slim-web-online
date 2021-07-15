import express from "express"
import paramSetList from "../data/ParamSetsList.js"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

router.get("/:userid", (req, res) => {
  try {
    const userSets = paramSetList.filter((paramSet) => paramSet.userID === parseInt(req.params.userid))
    res.status(200).json(userSets)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})
  
//adds a new parameter set serverside
router.post("/", (req, res) => {
  const newParamSet = {
    id: req.body.id,
    userID: parseInt(req.cookies.userID),
    title: req.body.title,
    mutRate: parseFloat(req.body.mutRate),
    popSize: parseInt(req.body.popSize)
  }

  paramSetList.push(newParamSet)
  res.json(paramSetList)
})
  
//deletes a parameter set
router.delete("/:id", (req, res) => {
  const found = paramSetList.some((paramSet) => paramSet.id === parseInt(req.params.id))

  if(found){
    //cleaner way to delete an object from the server
    const indexToDelete = paramSetList.findIndex(set => set.id === parseInt(req.params.id))
    paramSetList.splice(indexToDelete, 1)

    res.json(paramSetList)
  }else{
    res.status(400).json({msg: "No parameter set with that id."})
  }
})

export default router