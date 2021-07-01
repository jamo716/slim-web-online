import outputs from "../data/Outputs.js"
import express from "express"
import fs from "fs"
import csv from "fast-csv"
import paramsets from "../data/Paramsets.js"
import {spawn} from "child_process"

const router = express.Router()

//get request for entire list of outputs
router.get("/", (req, res) => {
    try{
      res.status(200).json(outputs)
    }catch{
      res.status(404).json({message: error.message})
    }
})

//get request for a single output
router.get("/:id", (req, res) => {
    const found = outputs.some((output) => output.id === parseInt(req.params.id))
       if(found){
         res.json(outputs.filter((output) => output.id === parseInt(req.params.id)))
       }else{
         res.status(400).json({msg: "No parameter set with that id."})
       }
  })

//post request new rendered output
router.post("/:id", (req, res) => {
    const found = outputs.some((output) => output.id === parseInt(req.params.id))
  
    if(!found){
      //stores outputs from csv file for a single simulation run
      const fileOutputs = []
  
      //first index referenced because the API returns an array of length one
      const paramsetToRun = paramsets.filter((paramset) => paramset.id === parseInt(req.params.id))[0]
  
      const child = spawn("slim", ["-d", `nQTL=${paramsetToRun.nQTL}`, "-d", `popSize=${paramsetToRun.popSize}`, "-d", `assortStr=${paramsetToRun.assortStr}`, "-d", `id=${parseInt(req.params.id)}`, "server/assortative-mating/slim-scripts/assortative-mating.slim"])
  
      child.on("exit", (code, signal) => {
        if(code){
            //console.log(code)
        }
        if(signal){
            //console.log(signal)
        }
        fs.createReadStream(`server/assortative-mating/slim-output/${parseInt(req.params.id)}/output.csv`)
        .pipe(csv.parse({}))
        .on("data", (data) => {
          const generationOutput = 
          {
            generation: parseInt(data[0]),
            phenotypes: data.slice(1)
          }
          fileOutputs.push(generationOutput)
        })
        .on("end", () => {
          res.status(200).json(fileOutputs)
          //format for new output object that goes into the server outputList cache of output objects with an id
          const newOutput = {
            id: parseInt(req.params.id),
            title: paramsetToRun.title,
            popSize: paramsetToRun.popSize,
            assortStr: paramsetToRun.assortStr,
            nQTL: paramsetToRun.nQTL,
            output: fileOutputs
          }
          //pushing onto server cache of computed outputs
          outputs.push(newOutput)
        })
      })
    }
    if(found){
      //filter out outputs that were already calculated so that we can return the cached output data
      //have to use [0] index because the filter function returns an array of length 1 with the filtered item
      const cachedOutput = outputs.filter((item) => item.id === parseInt(req.params.id))[0]
      res.status(200).json(cachedOutput.output)
    }
  })

export default router