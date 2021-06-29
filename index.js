const express = require("express")
require('dotenv').config();

const initMongoose = require("./mongoose/mongoose")
const { PORT } = process.env
const apiRouter = require("./routes/apiRouter")

const app = express()
initMongoose()
app.use(express.json())
app.use("/api", apiRouter)

app.listen(PORT)
