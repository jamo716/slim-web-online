import outputs from "../data/Outputs.js"
import express from "express"
import fs from "fs"
import csv from "fast-csv"
import paramsets from "../data/Paramsets.js"
import {spawn} from "child_process"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie parser middleware that returns an object containing cookie data by key accessed by req.cookies
router.use(cookieParser())

//get request for entire list of outputs
router.get("/:userid", (req, res) => {
    try{
      const userOutputs = outputs.filter((output) => output.userID === parseInt(req.params.userid))
      res.status(200).send (userOutputs)
    }catch{
      res.status(404).json({message: error.message})
    }
})

//get request for a single output
router.get("/:userid/:id", (req, res) => {
  try {
    const userOutputs = outputs.filter((output) => output.userID === parseInt(req.params.userid))
    res.json(userOutputs.filter((output) => output.id === parseInt(req.params.id)))

  } catch (error) {
    res.status(404).json({message: error.message})
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
          phenotypes: data.slice(1).map(element => parseInt(element))
        }
        fileOutputs.push(generationOutput)
      })
      .on("end", () => {
        res.status(200).json(fileOutputs)
        //format for new output object that goes into the server outputList cache of output objects with an id
        const newOutput = {
          id: parseInt(req.params.id),
          userID: parseInt(req.cookies.userID),
          title: paramsetToRun.title,
          popSize: paramsetToRun.popSize,
          assortStr: paramsetToRun.assortStr,
          nQTL: paramsetToRun.nQTL,
          output: fileOutputs
        }
        //pushing onto server cache of computed outputs
        outputs.push(newOutput)

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
    const indexToDelete = outputs.findIndex(set => set.userID === parseInt(req.params.userid) & set.id === parseInt(req.params.id))
    outputs.splice(indexToDelete, 1)
    res.json(outputs)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

export default router