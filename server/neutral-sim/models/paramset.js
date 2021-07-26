import mongoose from "mongoose"

const paramsetSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    popSize: { type: Number, required: true },
    mutRate: { type: Number, required: true },
    simLength: {type: Number, required: true}
});

var Neut_Paramset = mongoose.model("Neut_Paramset", paramsetSchema)

export default Neut_Paramset