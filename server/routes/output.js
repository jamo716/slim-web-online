import express from "express"
import fs from "fs"
import csv from "fast-csv"
import paramSetList from "../data/ParamSetsList.js"
import {execSync, spawn} from "child_process"
import outputList from "../data/OutputList.js"


const router = express.Router()

// router.post("/:id", (req, res) => {
//   const found = outputList.some((output) => output.id === parseInt(req.params.id))
//   //the parameter set to compute with SLiM
//   const paramSetToRun = paramSetList.filter((paramSet) => paramSet.id === parseInt(req.params.id))[0]

//   if(!found){
//     //stores outputs from csv file for a single simulation run
//     const fileOutputs = []

//     //synchronous command line execution so data can finish rendering
//     execSync(`slim -d mutRate=${paramSetToRun.mutRate} -d popSize=${paramSetToRun.popSize} server/slim-scripts/test.slim`, (stdout) => {
//       //console.log(stdout)
//     })

//     //reads csv file of outputs then creates an array of JS objects that get sent in JSON format to the front end
 
//       fs.createReadStream("server/slim-output/test.csv")
//       .pipe(csv.parse({}))
//       .on("data", (data) => {
//         const generationOutput = 
//         {
//           generation: data[0],
//           mutCount: data[1]
//         }
//         fileOutputs.push(generationOutput)
//       })
//       .on("end", () => {
//         res.status(200).json(fileOutputs)
//         //format for new output object that goes into the server outputList cache of output objects with an id
//         const newOutput = {
//           id: parseInt(req.params.id),
//           output: fileOutputs
//         }
//         //pushing onto server cache of computed outputs
//         outputList.push(newOutput)
//       })
//   }
//   if(found){
//     //filter out outputs that were already calculated so that we can return the cached output data
//     //have to use [0] index because the filter function returns an array of length 1 with the filtered item
//     const cachedOutput = outputList.filter((item) => item.id === parseInt(req.params.id))[0]
//     res.status(200).json(cachedOutput.output)
//   }
// })

//get request for entire list of outputs
router.get("/", (req, res) => {
  try{
    res.status(200).json(outputList)
  }catch{
    res.status(404).json({message: error.message})
  }
})

//get request for a single output
router.get("/:id", (req, res) => {
  const found = outputList.some((output) => output.id === parseInt(req.params.id))
     if(found){
       res.json(outputList.filter((output) => output.id === parseInt(req.params.id)))
     }else{
       res.status(400).json({msg: "No parameter set with that id."})
     }
})


//post request new rendered output
router.post("/:id", (req, res) => {
  const found = outputList.some((output) => output.id === parseInt(req.params.id))
  //the parameter set to compute with SLiM

  if(!found){
    //stores outputs from csv file for a single simulation run
    const fileOutputs = []

    const paramSetToRun = paramSetList.filter((paramSet) => paramSet.id === parseInt(req.params.id))[0]

    const child = spawn("slim", ["-d", `mutRate=${paramSetToRun.mutRate}`, "-d", `popSize=${paramSetToRun.popSize}`, "-d", `id=${parseInt(req.params.id)}`, "server/slim-scripts/test.slim"])

    child.on("exit", (code, signal) => {
      if(code){
          //console.log(code)
      }
      if(signal){
          //console.log(signal)
      }
      fs.createReadStream(`server/slim-output/${parseInt(req.params.id)}/test.csv`)
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
          title: paramSetToRun.title,
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