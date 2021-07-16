import React, {useContext} from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"
import { NeutralSimContext } from '../context/NeutralSimContext'

export const LoadingCircle = () => {
    const {isRendering} = useContext(NeutralSimContext)

    return (
        <div className="loading-circle">
            {isRendering ? <CircularProgress/> : null}
        </div>
    )
}

export default LoadingCircle