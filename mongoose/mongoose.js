const mongoose = require("mongoose")

const { dbConfig } = require("../config.json")

module.exports = () => {
    mongoose.connect(dbConfig.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on("open",()=>console.log("connection started"))
    db.on("error",(err)=>console.log(err))

}