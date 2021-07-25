import express from "express"
import fs from "fs"
import csv from "fast-csv"
import {spawn} from "child_process"
import cookieParser from "cookie-parser"
import Assort_Output from "../models/output.js"
import Assort_Paramset from "../models/paramset.js"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//get request for entire list of outputs
router.get("/:userid", (req, res) => {
    try{
      Assort_Output.find({userID: parseInt(req.params.userid)})
        .then(outputs => {
          res.status(200).json(outputs)
        })
      // const userOutputs = outputs.filter((output) => output.userID === parseInt(req.params.userid))
      // res.status(200).send (userOutputs)
    }catch{
      res.status(404).json({message: error.message})
    }
})

//get request for a single output
router.get("/:userid/:id", (req, res) => {
  try {
    Assort_Output.find({userID: parseInt(req.params.userid), id: parseInt(req.params.id)})
      .then(output => {
        res.status(200).json(output)
      })
    // const userOutputs = outputs.filter((output) => output.userID === parseInt(req.params.userid))
    // res.json(userOutputs.filter((output) => output.id === parseInt(req.params.id)))

  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

//post request new rendered output
router.post("/:id", async (req, res) => {

  //wait to get array of outputs from the database that match request ID
  const outputs = await Assort_Output.find({id: parseInt(req.params.id)})

  const found = outputs.some((output) => output.id === parseInt(req.params.id))

  if(!found){
    //stores outputs from csv file for a single simulation run
    const fileOutputs = []

    //get parameter set to render in slim from database
    let paramsetToRun = await Assort_Paramset.find({id: parseInt(req.params.id)})
  
    //reassign paramset to render in simulation as first index since database query returns an array
    paramsetToRun = paramsetToRun[0]

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
          phenotypes: data.slice(1).map(element => parseInt(element))
        }
        fileOutputs.push(generationOutput)
      })
      .on("end", () => {
        //format for new output object that goes into the server outputList cache of output objects with an id
        const newOutput = new Assort_Output({
          id: parseInt(req.params.id),
          userID: parseInt(req.cookies.userID),
          title: paramsetToRun.title,
          popSize: paramsetToRun.popSize,
          assortStr: paramsetToRun.assortStr,
          nQTL: paramsetToRun.nQTL,
          output: fileOutputs
        })
        
        //output object saved to the database
        newOutput.save()
        .then(output => {
          res.status(200).json(output)
        })

        //path to output folder we delete
        const path = `server/assortative-mating/slim-output/${parseInt(req.params.id)}`

        //recursively delete output folder and its contents
        fs.rmdir(path, {recursive: true}, (error) => {
          if(error){
            console.log(error)
            return
          }
        })
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

router.delete("/:userid/:id", (req, res) => {
  try {
    Assort_Output.findOneAndDelete({userID: parseInt(req.params.userid), id: parseInt(req.params.id)})
      .then(output => {
        res.status(200).json(output)
      })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

export default router