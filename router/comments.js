import express from 'express'
import Comments from '../controllers/CommentsControllers.js'
import { authentication } from '../middlewares/authentication.js'

const comments = express.Router()

comments.post('/create/:_id', authentication, Comments.create)

export default comments
