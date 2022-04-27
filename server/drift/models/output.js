import mongoose from "mongoose"

const outputSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    run: { type: Number, required: true },
    title: { type: String, required: true },
    popSize: {type: Number, required: true},
    simLength: {type: Number, required: true},
    output: []
});

var Drift_Output = mongoose.model("Drift_Output", outputSchema)

export default Drift_Output