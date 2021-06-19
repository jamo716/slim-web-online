import React from "react";
import axios from "axios"
import Header from "./components/Header"
import ParamSets from "./components/ParamSets"
import AddParamsMenu from "./components/AddParamsMenu"
import {useEffect} from "react"
import "./App.css";
import CircularProgress from "@material-ui/core/CircularProgress"
import OutputList from "./components/OutputList";
import OutputChart from "./components/OutputChart";

function App() {

  //state variable for whether or not to show the parameter menu
  const[showParamMenu, setShowParamMenu] = React.useState(true)

  //state variable for parameter sets
  const [paramSets, setParamSets] = React.useState([])

  //state variable for list of outputs that have been rendered
  const [outputs, setOutputs] = React.useState([])

  //state variable for whether front end is rendering a simulation
  const [isRendering, setIsRendering] = React.useState(false)

  //state variable for data being sent to graph
  const [graphData, setGraphData] = React.useState()

  //fetch parameter sets when site first launches with useEffect() function
  useEffect(() => {
    axios.get("/paramSet").then((paramSets) => {
        setParamSets(paramSets.data)
    })

    axios.get("/output").then((serverOutputs) => {
      setOutputs(serverOutputs.data)
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


  async function receiveOutput() {
    try {
      const response = await axios.get('/output/');
      setOutputs(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  //submits a parameter set to be rendered as output on server
  const renderParameterSet = async (id) => {
    setIsRendering(true)
    //wait until the post finishes
    await axios.post(`/output/${id}`)
    //then update the front end with all computed outputs

    receiveOutput()
    setIsRendering(false)
  }

  const renderGraph = async (id) => {
    try{
      const response = await axios.get(`/output/${id}`)
      setGraphData(response.data[0])
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="input-output">
        <div className="input">
          <Header onToggle={toggleParamMenu}/>
          {showParamMenu && <AddParamsMenu onAdd={addParamSet}/>}
          {paramSets.length > 0 ? <ParamSets paramSets={paramSets} onDelete={deleteParamSet} onRetrieve={renderParameterSet}/> :  "No parameter sets made."}
        </div>
        <div className="output">
          <h3>Outputs</h3>
          <OutputList outputs={outputs} onGraph={renderGraph}/>
          {isRendering ? <CircularProgress/> : null}
          {graphData && <OutputChart graphData={graphData}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
