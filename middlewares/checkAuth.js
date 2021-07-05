const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = process.env

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers["access_token"];
        const payload = await jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userId = payload.user._id
        req.accessToken = accessToken
        next()
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            try{
                const token = req.headers["access_token"];
                const payload = await jwt.verify(token, ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
                req.userId = payload.user._id
                const accessToken = await jwt.sign({ user: { _id: payload.user._id } }, ACCESS_TOKEN_SECRET, { expiresIn: "2m" })
                req.accessToken = accessToken
                next()
            }catch(err){
                res.statusCode = 401
                res.send({"msg":err.message})
            }
        }else{
            res.statusCode = 401
            res.send({"msg":e.message})
        }
    }
}

module.exports = { checkAuth }