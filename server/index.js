import express from "express"
import cors from "cors"
import {exec} from "child_process"
import outputRouter from "../server/routes/output.js"
import paramSetRouter from "../server/routes/paramSet.js"

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json({limit: "20mb", extended: true}))
app.use("/output", outputRouter)
app.use("/paramSet", paramSetRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});