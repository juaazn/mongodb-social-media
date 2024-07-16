import express from 'express'
import UserController from '../controllers/UserController.js'
import { authentication } from '../middlewares/authentication.js'
import { typeError } from '../middlewares/errors.js'

const user = express.Router()

user.get('/get/:_id', authentication, UserController.getUser)
user.post('/create', typeError, UserController.create)
user.post('/login', UserController.login)
user.delete('/logout/:_id', authentication, UserController.logout)

export default user
