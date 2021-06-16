const OutputElement = (({outputID}) => {
    return(
        <div className="output-element">
            <h3>
                Output Card
            </h3>
            <p>
                {outputID}
            </p>
        </div>
    )
})

export default OutputElement