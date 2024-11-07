import express from 'express'
import { allUserList, inforOfuser, loginUser, registerUser } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/all-user' , allUserList)
userRouter.get('/info-user' ,authMiddleware, inforOfuser)

export default userRouter;