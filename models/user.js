const mongoose = require("mongoose")

let passwordValidators = [
    { validator: v => /^(?=.*[a-z])/.test(v), message: "password must contain atleast 1 lowercase char" },
    { validator: v => /^(?=.*[A-Z])/.test(v), message: "password must contain atleast 1 uppercase char" },
    { validator: v => /^(?=.*[0-9])/.test(v), message: "password must contain atleast 1 digit" },
    { validator: v => /^(?=.{8,256})/.test(v), message: "password must be atleast 8 char" },
]
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 },
            message: "hi error"
        },
        maxLength: 150,
        validate: {
            validator: v =>
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v)
            ,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators
    }
})

// attach our schema to the collection in DB  
const userModel = mongoose.model("users",userSchema)

module.exports = userModel