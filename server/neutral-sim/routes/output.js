import express from "express"
import fs from "fs"
import csv from "fast-csv"
import paramSetList from "../data/Paramsets.js"
import {spawn} from "child_process"
import outputs from "../data/Outputs.js"
import cookieParser from "cookie-parser"
import Neut_Output from "../models/output.js"
import Neut_Paramset from "../models/paramset.js"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//get request for entire list of outputs
router.get("/:userid", (req, res) => {
  try{
    Neut_Output.find({userID: parseInt(req.params.userid)})
      .then(outputs => {
        res.status(200).json(outputs)
      })
  }catch{
    res.status(404).json({message: error.message})
  }
})

//get request for a single output with a run specified 
router.get("/:userid/:id/:run", (req, res) => {
  try {
    const userOutputs = outputs.filter((output) => output.userID === parseInt(req.params.userid))
    const idOutputs = userOutputs.filter((output) => output.id === parseInt(req.params.id)) 
    const runOutput = idOutputs.filter((output) => output.run === parseInt(req.params.run))
    res.json(runOutput)

  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

//this function doesn't do anything but it shows how to use async await structure to put database document into an object
router.put("/:id", async (req, res) => {
  let paramset = await Neut_Paramset.find({id: parseInt(req.params.id)})
  paramset = paramset[0]
  console.log(paramset)

  let outputs = await Neut_Output.find({id: parseInt(req.params.id)})
  console.log(outputs)
})

//post request new rendered output
router.post("/:id", async (req, res) => {
  
  //get array of the runs at this id, then get the maximum "run" property from those output objects
  //store the length of the runs and the max value in an object
  //if the number of runs is equal to zero then you assign a run value of 1, otherwise, add one value to the highest
  const outputs = await Neut_Output.find({id: parseInt(req.params.id)})

  const idRuns = outputs.filter((output) => output.id === parseInt(req.params.id))
  const maxRuns = Math.max.apply(Math, idRuns.map(function(o) { return o.run; }))

  const runObject = {
    len: idRuns.length,
    runs: maxRuns
  }

  //stores outputs from csv file for a single simulation run
  const fileOutputs = []

  //first index referenced because the API returns an array of length one
  // const paramSetToRun = paramSetList.filter((paramSet) => paramSet.id === parseInt(req.params.id))[0]
  let paramSetToRun = await Neut_Paramset.find({id: parseInt(req.params.id)})
  paramSetToRun = paramSetToRun[0]

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
      //format for new output object that goes into the server outputs cache of output objects with an id
      const newOutput = new Neut_Output({
        id: parseInt(req.params.id),
        userID: parseInt(req.cookies.userID),
        run: (runObject.len === 0 ? 1 : (runObject.runs + 1)),
        title: paramSetToRun.title,
        popSize: paramSetToRun.popSize,
        mutRate: paramSetToRun.mutRate,
        output: fileOutputs
      })

      //pushing onto server cache of computed outputs
      // outputs.push(newOutput)
      newOutput.save()
        .then(output => {
          res.status(200).json(output)
        })

      //path to output folder we delete
      const path = `server/neutral-sim/slim-output/${parseInt(req.params.id)}`

      //recursively delete output folder and its contents
      fs.rmdir(path, {recursive: true}, (error) => {
        if(error){
          console.log(error)
          return
        }
      })
    })
  })
})

router.delete("/:userid/:id/:run", (req, res) => {
  try {
    Neut_Output.findOneAndDelete({userID: parseInt(req.params.userid), id: parseInt(req.params.id), run: parseInt(req.params.run)})
      .then(output => {
        res.status(200).json(output)
      })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

export default router