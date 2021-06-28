//this is the page for the default neutral script that was used for the proof of concept

import React from "react"
import axios from "axios"
import Header from "./components/Header"
import ParamSets from "./components/ParamSets"
import AddParamsMenu from "./components/AddParamsMenu"
import OutputList from "./components/OutputList";
import OutputChart from "./components/OutputChart";
import {NeutralSimProvider} from "./context/NeutralSimContext"
import LoadingCircle from "./components/LoadingCircle"

function NeutralSim() {
  
    return (
      <NeutralSimProvider>
        <div className="container">
          <div className="input-output">
            <div className="input">
              <Header/>
              <AddParamsMenu/>
              <ParamSets/>
            </div>
            <div className="output">
              <h3>Outputs</h3>
              <OutputList/>
              <LoadingCircle/>
              <OutputChart/>
            </div>
          </div>
        </div>
      </NeutralSimProvider>
    );
  }
  export default NeutralSim;
  