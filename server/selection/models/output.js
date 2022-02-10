import mongoose from "mongoose"

const outputSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    run: { type: Number, required: true },
    title: { type: String, required: true },
    pInit: { type: Number, required: true },
    h: { type: Number, required: true },
    s: { type: Number, required: true },
    simLength: {type: Number, required: true},
    output: []
});

var Sel_Output = mongoose.model("Sel_Output", outputSchema)

export default Sel_Output