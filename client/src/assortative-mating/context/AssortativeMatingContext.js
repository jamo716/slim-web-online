import React, { createContext, useEffect } from 'react'
import axios from "axios"
import Cookies from "js-cookie"

export const AssortativeMatingContext = createContext()

export const AssortativeMatingProvider = ({children}) => {
  //state variable for whether or not to show the parameter menu
  const[showParamMenu, setShowParamMenu] = React.useState(true)

  //state variable for parameter sets
  const [paramSets, setParamSets] = React.useState([])

  //state variable for list of outputs that have been rendered
  const [outputs, setOutputs] = React.useState([])

  //state variable for whether front end is rendering a simulation
  const [isRendering, setIsRendering] = React.useState(false)

  //state variable for data being sent to graph
  const [graphData, setGraphData] = React.useState([])

  //one time initial get of parameter sets and outputs
  useEffect(() => {
      const userID = Cookies.get("userID")

      axios.get(`/api/assortativemating/paramset/${userID}`).then((paramSets) => {
          setParamSets(paramSets.data)
      })
  
      axios.get(`/api/assortativemating/output/${userID}`).then((serverOutputs) => {
        setOutputs(serverOutputs.data)
      })
  }, [])

  //toggles visibility of parameter menu
  const toggleParamMenu = () => {
      setShowParamMenu(!showParamMenu)
  }

  //adds a new parameter set to the array of parameter sets
  const addParamSet = (paramSet) => {
      //random id generated for new parameter set
      const id = Math.floor(Math.random() * 10000 + 1)
  
      const newParamSet = {id, ...paramSet}
      axios.post("/api/assortativemating/paramset", newParamSet)
      setParamSets([...paramSets, newParamSet])
  }
    
  //deletes a parameter set
  const deleteParamSet = (id) => {
      axios.delete(`/api/assortativemating/paramset/${id}`)
  
      setParamSets(paramSets.filter((paramSet) => paramSet.id !== id))
  }

  //get all outputs froms server
  async function receiveOutput() {
    try {
      const userID = Cookies.get("userID")
      const response = await axios.get(`/api/assortativemating/output/${userID}`);
      setOutputs(response.data)
    } catch (error) {
      console.error(error);
    }
  }
    
  //submits a parameter set to be rendered as output on server
  const renderParameterSet = async (id) => {
    setIsRendering(true)
    //wait until the post finishes
    await axios.post(`/api/assortativemating/output/${id}`)
    //then update the front end with all computed outputs

    receiveOutput()
    setIsRendering(false)
  }

  //deletes an output from the server
  const deleteOutput = async (id) => {
    const userID = Cookies.get("userID")
    await axios.delete(`/api/assortativemating/output/${userID}/${id}`)

    receiveOutput()
  }

  const renderGraph = async (id) => {
    try{
      const userID = Cookies.get("userID")
      const response = await axios.get(`/api/assortativemating/output/${userID}/${id}`)
      setGraphData(response.data[0].output)
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <AssortativeMatingContext.Provider value={{
        showParamMenu, 
        paramSets,
        outputs, 
        isRendering,
        graphData,
        toggleParamMenu,
        addParamSet,
        deleteParamSet,
        renderParameterSet,
        deleteOutput,
        renderGraph
    }}>
        {children}
    </AssortativeMatingContext.Provider>
  )
}

