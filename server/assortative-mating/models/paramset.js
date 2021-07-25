import mongoose from "mongoose"

const paramsetSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    popSize: { type: Number, required: true },
    assortStr: { type: Number, required: true },
    nQTL: {type: Number, required: true}
});

var Assort_Paramset = mongoose.model("Assort_Paramset", paramsetSchema)

export default Assort_Paramset