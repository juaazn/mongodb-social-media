import Comments from '../models/Comments.js'
import User from '../models/User.js'
import Post from '../models/Post.js'

const CommentsController = {
  async create(req, res) {
    try {
      const userName = await User.findById({ _id: req.params?._id })
      const postId = await  Post.findById({ _id: req.query?._id })
      const { body } = req.body

      if (userName._id.toString() !== req.params?._id) throw 'El usuario no existe'
      
      const comments = await Comments.create({
        userName: userName.name,
        body,
        deliveryDate: new Date().setDate(new Date().getDate() + 2)
      })
      
      await Post.findByIdAndUpdate(postId._id, { $push: { comments: comments } },)
      
      res.status(201).send(comments)
    } catch (error) {
      console.error(error)
    }
  }
}

export default CommentsController
