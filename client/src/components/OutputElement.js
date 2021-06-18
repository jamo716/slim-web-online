const OutputElement = (({output}) => {
    return(
        <div className="output-element">
            <h3>
                {output.title}
            </h3>
            <p>
                {output.id}
            </p>
        </div>
    )
})

export default OutputElement