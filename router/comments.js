import express from 'express'
import Comments from '../controllers/CommentsControllers.js'
import { authentication, isAuthorComments } from '../middlewares/authentication.js'

const comments = express.Router()

comments.post('/create/:_id', authentication, Comments.create)
comments.put('/edit/:_id', authentication, isAuthorComments, Comments.editComments)
comments.get('/get', Comments.getAll)
comments.delete('/delete/:_id', authentication, isAuthorComments, Comments.delete)

export default comments
