import 'dotenv/config'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Post from '../models/Post.js'

export const authentication = async (req, res, next) => {
 try {
   const token = req.headers.authorization
   const payload = jwt.verify(token, process.env.JWT_SECRET)
   const user = await User.findOne({ _id: payload._id, tokens: token })
   if (!user) {
     return res.status(401).send({ message: 'No estás autorizado' })
   }
   req.user = user
   next()
 } catch (error) {
   console.error(error)
   return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
 }
}

export const isAuthor = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params._id)

    if (posts.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Este Post no es tuyo' })
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del post'})
  }
 }
 