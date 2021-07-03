const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const register = async (req, res, next) => {
    try {
        // hash user password 
        const user = userModel(req.body)
        user.password = await bcrypt.hash(user.password, 12);
        const { _id, name, email } = await user.save()
        // create access token 
        const accessToken = await jwt.sign({ user: { _id: _id } }, ACCESS_TOKEN_SECRET, { expiresIn: "2m" })
        // send res 
        res.statusCode = 201
        res.send({ access_token: accessToken, user: { _id, name, email } })
    } catch (e) {
        if (e.code != null && e.code == 11000) {
            res.statusCode = 400
            res.send({ "msg": "email already exists" })
        }
        res.statusCode = 400
        res.send(e)
    }

}

const login = async (req, res, next) => {
    try{
        console.log(req.body)
        const userDoc = await userModel.findOne({ email: req.body.email })
        // user doesn't exist 
        if (!userDoc) {
            res.statusCode = 401
            res.send({ "msg": "email does not exist" })
        }
        const { _id, name, email } = userDoc
        // compare incoming password with hashed one  
        const doMatch = await bcrypt.compare(req.body.password, userDoc.password);
        // incorrect pass
        if (!doMatch) {
            res.statusCode = 401
            res.send({ "msg": "password is incorrect" })
        }
        // create access token 
        const accessToken = await jwt.sign({ user: { _id: _id } }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
        // send res 
        res.statusCode = 200
        res.send({ access_token: accessToken, user: { _id, name, email } })
    }catch(e){
        res.statusCode = 400;
        res.send(e)
    }
}
module.exports = { register, login }
