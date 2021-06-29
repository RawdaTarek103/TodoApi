const express = require("express")
const userRouter = require("./userRouter")
const todoRouter = require("./todoRouter")
const taskRouter = require("./taskRouter")
const { checkAuth } = require('../middlewares/checkAuth')
const { reqBodyCheck } = require('../middlewares/reqBodyCheck')

const apiRouter = express.Router()

apiRouter.post("*", reqBodyCheck)
apiRouter.patch("*", reqBodyCheck)
apiRouter.use("/user", userRouter)
apiRouter.use("/todo", checkAuth, todoRouter)
apiRouter.use("/task", checkAuth, taskRouter)

module.exports = apiRouter