/*
The parameter set menu component of the web-app.
Allows user to input parameter values and then submit them to the paramSets global state.
*/

import {useState} from "react"

const AddParamsMenu = (({onAdd}) => {
    const [title, setTitle] = useState("")
    const [mutRate, setMutRate] = useState(0)
    const [popSize, setPopSize] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title || !mutRate || !popSize){
            alert("Please supply values to all parameters.")
        }else{
            onAdd({title, mutRate, popSize})

            setTitle("")
            setMutRate(0)
            setPopSize(0)
        }
    }

    return(
        <form className="add-params-menu" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Parameter Set Title</label>
                <input type="text" placeholder="Add Title" value={title} onChange={
                    (e) => setTitle(e.target.value)
                    }/>
            </div>
            <div className="form-control">
                <label>Mutation Rate</label>
                <input type="number" placeholder="Add Mutation Rate" value={mutRate} onChange={
                    (e) => setMutRate(e.target.value)
                    }/>
            </div>
            <div className="form-control">
                <label>Population Size</label>
                <input type="number" placeholder="Add Population Size" value={popSize} onChange={
                    (e) => setPopSize(e.target.value)
                    }/>
            </div>

            <input type="submit" value="Save Parameter Set" className="btn btn-block"/>
        </form>
    )
})

export default AddParamsMenu