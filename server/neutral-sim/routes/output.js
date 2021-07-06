import express from "express"
import fs from "fs"
import csv from "fast-csv"
import paramSetList from "../data/ParamSetsList.js"
import {spawn} from "child_process"
import outputList from "../data/OutputList.js"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//get request for entire list of outputs
router.get("/:userid", (req, res) => {
  try{
    const userOutputs = outputList.filter((output) => output.userID === parseInt(req.params.userid))
    res.status(200).json(userOutputs)
  }catch{
    res.status(404).json({message: error.message})
  }
})

//get request for a single output
router.get("/:userid/:id", (req, res) => {
  try {
    const userOutputs = outputList.filter((output) => output.userID === parseInt(req.params.userid))
    res.json(userOutputs.filter((output) => output.id === parseInt(req.params.id)))

  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

//post request new rendered output
router.post("/:id", (req, res) => {
  const found = outputList.some((output) => output.id === parseInt(req.params.id))

  if(!found){
    //stores outputs from csv file for a single simulation run
    const fileOutputs = []

    //first index referenced because the API returns an array of length one
    const paramSetToRun = paramSetList.filter((paramSet) => paramSet.id === parseInt(req.params.id))[0]

    const child = spawn("slim", ["-d", `mutRate=${paramSetToRun.mutRate}`, "-d", `popSize=${paramSetToRun.popSize}`, "-d", `id=${parseInt(req.params.id)}`, "server/neutral-sim/slim-scripts/test.slim"])

    child.on("exit", (code, signal) => {
      if(code){
          //console.log(code)
      }
      if(signal){
          //console.log(signal)
      }
      fs.createReadStream(`server/neutral-sim/slim-output/${parseInt(req.params.id)}/test.csv`)
      .pipe(csv.parse({}))
      .on("data", (data) => {
        const generationOutput = 
        {
          generation: parseInt(data[0]),
          mutCount: parseInt(data[1])
        }
        fileOutputs.push(generationOutput)
      })
      .on("end", () => {
        res.status(200).json(fileOutputs)
        //format for new output object that goes into the server outputList cache of output objects with an id
        const newOutput = {
          id: parseInt(req.params.id),
          userID: parseInt(req.cookies.userID),
          title: paramSetToRun.title,
          popSize: paramSetToRun.popSize,
          mutRate: paramSetToRun.mutRate,
          output: fileOutputs
        }
        //pushing onto server cache of computed outputs
        outputList.push(newOutput)
      })
    })
  }
  if(found){
    //filter out outputs that were already calculated so that we can return the cached output data
    //have to use [0] index because the filter function returns an array of length 1 with the filtered item
    const cachedOutput = outputList.filter((item) => item.id === parseInt(req.params.id))[0]
    res.status(200).json(cachedOutput.output)
  }
})

  export default router