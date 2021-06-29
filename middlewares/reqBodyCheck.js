const reqBodyCheck = (req,res,next) =>{
    if (JSON.stringify(req.body)=== "{}") {
        res.statusCode = 400
        res.send({ "msg": "request body can not be empty" })
    }
    next();
}

module.exports = {reqBodyCheck}