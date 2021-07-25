import mongoose from "mongoose"

const outputSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    popSize: { type: Number, required: true },
    assortStr: { type: Number, required: true },
    nQTL: { type: Number, required: true },
    output: []
});

var Assort_Output = mongoose.model("Assort_Output", outputSchema)

export default Assort_Output