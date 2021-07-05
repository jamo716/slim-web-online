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
      const filtered = paramSetList.filter((paramSet) => paramSet.id !== parseInt(req.params.id))
      
      //clear out the paramSetList
      paramSetList.splice(0, paramSetList.length)
    
      //push the non-deleted elements back onto it
      for(let i = 0; i < filtered.length; i++){
          paramSetList.push(filtered[i])
      }
      res.json(paramSetList)
  }else{
    res.status(400).json({msg: "No parameter set with that id."})
  }
})

export default router