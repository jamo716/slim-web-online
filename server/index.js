import express from "express"
import cors from "cors"

import outputRouter from "./neutral-sim/routes/output.js"
import paramSetRouter from "./neutral-sim/routes/paramset.js"

import paramsetRouterAM from "./assortative-mating/routes/paramset.js"
import outputRouterAM from "./assortative-mating/routes/output.js"

import paramsetRouterMut from "./mutation/routes/paramset.js"
import outputRouterMut from "./mutation/routes/output.js"

import paramsetRouterSel from "./selection/routes/paramset.js"
import outputRouterSel from "./selection/routes/output.js"

import paramsetRouterMutSel from "./mut-sel-balance/routes/paramset.js"
import outputRouterMutSel from "./mut-sel-balance/routes/output.js"

import paramsetRouterDrift from "./drift/routes/paramset.js"
import outputRouterDrift from "./drift/routes/output.js"

//MONGO CONNECTION STUFF FOR NOW

import mongoose from "mongoose"

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR OWN SERVER
const database = 'main';          // REPLACE WITH YOUR OWN DB NAME

mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

/////////////////

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json())

//endpoints for the proof of concept neutral simulation
//these will be phased out eventually
app.use("/api/neutralsim/output", outputRouter)
app.use("/api/neutralsim/paramset", paramSetRouter)

//endpoints for assortative mating simulation
app.use("/api/assortativemating/paramset", paramsetRouterAM)
app.use("/api/assortativemating/output", outputRouterAM)

//endpoints for mutation simulation
app.use("/api/mutation/paramset", paramsetRouterMut)
app.use("/api/mutation/output", outputRouterMut)

//endpoints for selection simulation
app.use("/api/selection/paramset", paramsetRouterSel)
app.use("/api/selection/output", outputRouterSel)

//endpoints for mutation selection simulation
app.use("/api/mutationselection/paramset", paramsetRouterMutSel)
app.use("/api/mutationselection/output", outputRouterMutSel)

//endpoints for drift simulation
app.use("/api/drift/paramset", paramsetRouterDrift)
app.use("/api/drift/output", outputRouterDrift)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});