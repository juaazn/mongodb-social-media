import "dotenv/config"
import express from 'express'
import dbConnection from './config/config.js'
import post from './router/post.js'
import user from './router/user.js'
import comments from './router/comments.js'
import { typeError } from './middlewares/errors.js'

const app = express()
dbConnection()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/post', post)
app.use('/user', user)
app.use('/comments', comments)

app.use(typeError)

app.listen(PORT, () => console.log(`Server on listener: ${PORT}`))
