import mongoose from "mongoose"

const paramsetSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    pInit: { type: Number, required: true },
    h: { type: Number, required: true },
    s: { type: Number, required: true },
    simLength: {type: Number, required: true}
});

var Sel_Paramset = mongoose.model("Sel_Paramset", paramsetSchema)

export default Sel_Paramset