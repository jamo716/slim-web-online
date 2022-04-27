import mongoose from "mongoose"

const paramsetSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    popSize: {type: Number, required: true},
    simLength: {type: Number, required: true}
});

var Drift_Paramset = mongoose.model("Drift_Paramset", paramsetSchema)

export default Drift_Paramset