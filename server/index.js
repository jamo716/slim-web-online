import express from "express"
import cors from "cors"
import outputRouter from "./neutral-sim/routes/output.js"
import paramSetRouter from "./neutral-sim/routes/paramSet.js"

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json())

//endpoints for the proof of concept neutral simulation
//these will be phased out eventually
app.use("/output", outputRouter)
app.use("/paramSet", paramSetRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});