import React from "react";
import axios from "axios"
import Header from "./components/Header"
import ParamSets from "./components/ParamSets"
import AddParamsMenu from "./components/AddParamsMenu"
import {useEffect} from "react"
import "./App.css";
import BasicTable from "./components/BasicTable"
import CircularProgress from "@material-ui/core/CircularProgress"

function App() {

  //state variable for whether or not to show the parameter menu
  const[showParamMenu, setShowParamMenu] = React.useState(true)

  //state variable for parameter sets
  const [paramSets, setParamSets] = React.useState([])

  //state variable for front end sim output
  const [output, setOutput] = React.useState(null)

  //fetch parameter sets when site first launches with useEffect() function
  useEffect(() => {
    axios.get("/paramSet").then((paramSets) => {
        setParamSets(paramSets.data)
    })
  }, [])

  //adds a new parameter set to the array of parameter sets
  const addParamSet = (paramSet) => {
    //random id generated for new parameter set
    const id = Math.floor(Math.random() * 10000 + 1)

    const newParamSet = {id, ...paramSet}
    axios.post("/paramSet", newParamSet)
    setParamSets([...paramSets, newParamSet])  
  }

  //toggles visibility of parameter menu
  const toggleParamMenu = () => {
    setShowParamMenu(!showParamMenu)
  }

  //deletes a parameter set
  const deleteParamSet = (id) => {
    axios.delete(`/paramSet/${id}`)

    setParamSets(paramSets.filter((paramSet) => paramSet.id !== id))
  }

  //testing function to submit parameters and get output from command line
  const receiveOutput = (id) => {
    setOutput([])
    axios.get(`/output/${id}`).then((outputToShow) => {
      //going to have to do something with this data
      setOutput(outputToShow.data)
    })
  }

  //decides what the output section of page should display depending on if data is available or not
  const renderOutput = () => {
    if(output === null){
      return(
        <h1>Simulation Output</h1>
      )
    }else if(output.length === 0){
      return(
        <CircularProgress/>
      )
    }else{
      return(
        <BasicTable output={output}/>
      )
    }
  }

  return (
    <div className="container">
      <div className="input-output">
        <div className="input">
          <Header onToggle={toggleParamMenu}/>
          {showParamMenu && <AddParamsMenu onAdd={addParamSet}/>}
          {paramSets.length > 0 ? <ParamSets paramSets={paramSets} onDelete={deleteParamSet} onRetrieve={receiveOutput}/> :  "No parameter sets made."}
        </div>
        <div className="output">
          {renderOutput()}
        </div>
      </div>
    </div>
  );
}

export default App;
