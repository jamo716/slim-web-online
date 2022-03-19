import mongoose from "mongoose"

const paramsetSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    pInit: { type: Number, required: true },
    h: { type: Number, required: true },
    s: { type: Number, required: true },
    fr: {type: Number, required: true},
    br: {type: Number, required: true},
    popSize: {type: Number, required: true},
    simLength: {type: Number, required: true}
});

var Mut_Sel_Paramset = mongoose.model("Mut_Sel_Paramset", paramsetSchema)

export default Mut_Sel_Paramset