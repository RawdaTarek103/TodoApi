const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = process.env

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers["access_token"];
        const payload = await jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userId = payload.user._id
        next()
    }catch(e){
        res.statusCode = 401
        res.send({"msg":e.message})
    }
}

module.exports = {checkAuth}