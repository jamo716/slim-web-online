import React, {useContext} from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"
import { AssortativeMatingContext } from '../context/AssortativeMatingContext'

export const LoadingCircle = () => {
    const {isRendering} = useContext(AssortativeMatingContext)

    return (
        <div>
            {isRendering ? <CircularProgress/> : null}
        </div>
    )
}

export default LoadingCircle