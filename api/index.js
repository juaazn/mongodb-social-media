import "dotenv/config"
import express from 'express'
import dbConnection from '../config/config.js'
import cors from 'cors'
import post from '../router/post.js'
import user from '../router/user.js'
import comments from '../router/comments.js'
import cloudinary from '../router/cloudinary.js'
import { typeError } from '../middlewares/errors.js'

const app = express()
dbConnection()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/api/post', post)
app.use('/api/user', user)
app.use('/api/comments', comments)
app.use('/api/cloudinary', cloudinary)

app.use(typeError)

app.listen(PORT, () => console.log(`Server on listener: ${PORT}`))
