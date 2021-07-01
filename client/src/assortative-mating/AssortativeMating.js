import React from 'react'
import {AssortativeMatingProvider} from './context/AssortativeMatingContext'
import Header from "./components/Header"
import AddParamsMenu from './components/AddParamsMenu'
import Paramsets from './components/Paramsets'

const AssortativeMating = () => {
    return (
        <AssortativeMatingProvider>
            <div className="container">
                <div className="input">
                    <Header/>
                    <AddParamsMenu/>
                    <Paramsets/>
                </div>
                <div className="output">

                </div>
                <div className="chart">

                </div>
            </div>
        </AssortativeMatingProvider>
    )
}

export default AssortativeMating