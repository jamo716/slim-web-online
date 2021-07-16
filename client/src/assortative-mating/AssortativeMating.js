import React from 'react'
import {AssortativeMatingProvider} from './context/AssortativeMatingContext'
import Header from "./components/Header"
import AddParamsMenu from './components/AddParamsMenu'
import Paramsets from './components/Paramsets'
import OutputList from "./components/OutputList"
import HistogramChart from "./components/HistogramChart"

const AssortativeMating = () => {
    return (
        <AssortativeMatingProvider>
            <div className="container">
                <div className="input-output">
                    <div className="input">
                        <Header/>
                        <AddParamsMenu/>
                        <Paramsets/>
                    </div>
                    <div className="output">
                        <OutputList/>
                    </div>
                    <div className="output-chart">
                        <HistogramChart/>
                    </div>
                </div>
            </div>
        </AssortativeMatingProvider>
    )
}

export default AssortativeMating