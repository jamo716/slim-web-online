import express from "express"
import fs from "fs"
import csv from "fast-csv"
import {spawn} from "child_process"
import cookieParser from "cookie-parser"
import Sel_Output from "../models/output.js"
import Sel_Paramset from "../models/paramset.js"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//get request for entire list of outputs
router.get("/:userid", (req, res) => {
  try{
    Sel_Output.find({userID: parseInt(req.params.userid)})
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
      Sel_Output.find({userID: parseInt(req.params.userid), id: parseInt(req.params.id), run: parseInt(req.params.run)})
        .then(output => {
          res.status(200).json(output)
        })
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  })

  //post request new rendered output
router.post("/:id", async (req, res) => {
  
    //wait to get array of outputs from the database that match request ID
    const outputs = await Sel_Output.find({id: parseInt(req.params.id)})
  
    //store the number of the runs and the max value in an object
    //if the number of runs is equal to zero then you assign a run value of 1, otherwise, add one value to the highest
    const idRuns = outputs.filter((output) => output.id === parseInt(req.params.id))
    const maxRuns = Math.max.apply(Math, idRuns.map(function(o) { return o.run }))
  
    const runObject = {
      len: idRuns.length,
      runs: maxRuns
    }
  
    //stores outputs from csv file for a single simulation run
    const fileOutputs = []
  
    //get parameter set to render in slim from database
    let paramSetToRun = await Sel_Paramset.find({id: parseInt(req.params.id)})
    
    //reassign paramset to render in simulation as first index since database query returns an array
    paramSetToRun = paramSetToRun[0]
  
    //spawn a child process to run slim script with specified parameters
    const child = spawn("slim", ["-d", `pInit=${paramSetToRun.pInit}`, "-d", `h=${paramSetToRun.h}`, "-d", `s=${paramSetToRun.s}`, "-d", `id=${req.params.id}`, "-d", `simLength=${paramSetToRun.simLength}`, "server/selection/slim-scripts/selection.slim"])
  
    //child process finishes
    child.on("exit", (code, signal) => {
      if(code){
          //console.log(code)
      }
      if(signal){
          //console.log(signal)
      }
      //open a read stream for the CSV file that SLiM wrote
      fs.createReadStream(`server/selection/slim-output/${parseInt(req.params.id)}/output.csv`)
      .pipe(csv.parse({}))
      .on("data", (data) => {
        const generationOutput = 
        {
          generation: parseInt(data[0]),
          p: parseFloat(data[1]),
          q: parseFloat(data[2]),
          p_2: parseFloat(data[3]),
          pq: parseFloat(data[4]),
          q_2: parseFloat(data[5]),
          w: parseFloat(data[6])
        }
        fileOutputs.push(generationOutput)
      })
      .on("end", () => {
        //format for new output object that we save to the database
        const newOutput = new Sel_Output({
          id: parseInt(req.params.id),
          userID: parseInt(req.cookies.userID),
          run: (runObject.len === 0 ? 1 : (runObject.runs + 1)),
          title: paramSetToRun.title,
          pInit: paramSetToRun.pInit,
          h: paramSetToRun.h,
          s: paramSetToRun.s,
          simLength: paramSetToRun.simLength,
          output: fileOutputs
        })
  
        //output object saved to the database
        newOutput.save()
          .then(output => {
            res.status(200).json(output)
          })
  
        //path to output folder we delete after reading from CSV file
        const path = `server/selection/slim-output/${parseInt(req.params.id)}`
  
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
      Sel_Output.findOneAndDelete({userID: parseInt(req.params.userid), id: parseInt(req.params.id), run: parseInt(req.params.run)})
        .then(output => {
          res.status(200).json(output)
        })
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  })

  export default router