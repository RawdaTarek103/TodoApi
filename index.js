const express = require("express")
const cors = require('cors')
require('dotenv').config();

const initMongoose = require("./mongoose/mongoose")
const { PORT } = process.env
const apiRouter = require("./routes/apiRouter")

const app = express()
initMongoose()
app.use(cors())
app.use(express.json())
app.use("/api", apiRouter)
app.get("/", (req,res)=>{res.send("hi")})
app.listen(PORT)
