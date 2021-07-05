import express from "express"
import paramSetList from "../data/ParamSetsList.js"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//responds with full parameter set list
router.get("/", (req, res) => {
  console.log(req.cookies)

    try {
        res.status(200).json(paramSetList)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
  });
  
  //responds with single parametere list specified by id'
   router.get("/:id", (req, res) => {
     const found = paramSetList.some((paramSet) => paramSet.id === parseInt(req.params.id))
    
     if(found){
       res.json(paramSetList.filter((paramSet) => paramSet.id === parseInt(req.params.id)))
     }else{
       res.status(400).json({msg: "No parameter set with that id."})
     }
   })
  
  //adds a new parameter set serverside
  router.post("/", (req, res) => {
    const newParamSet = {
      id: req.body.id,
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