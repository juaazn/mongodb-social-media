import express from 'express'
import PostController from '../controllers/PostControllers.js'
import { upload } from '../utils/cloudinary.js'

import { authentication, isAuthor } from '../middlewares/authentication.js'
import { typeError } from '../middlewares/errors.js'

const posts = express.Router()

posts.get('/getAll', PostController.getAll)
posts.get('/id/:_id', PostController.getById)
posts.get('/name/:_id', PostController.getPostByName)
posts.post('/create/:_id', upload.single('picture'), authentication, typeError, PostController.create)
posts.post('/like/:_id', authentication, PostController.like)
posts.put('/update/:_id', authentication, isAuthor, PostController.update)
posts.delete('/delete/:_id', authentication, isAuthor, PostController.delete)
posts.delete('/deleteLike/:userId', authentication, PostController.disLike)

export default posts
