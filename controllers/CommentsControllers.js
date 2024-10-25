import Comments from '../models/Comments.js'
import User from '../models/User.js'
import Post from '../models/Post.js'

const CommentsController = {
  async create(req, res) {
    try {
      const idPost = req.params._id
      const idUser = req.user._id
      const user = await User.findById(idUser)
      const post = await  Post.findById(idPost)
      const { body } = req.body

      if (user._id.toString() !== req.params._id) return res.status(400).send({ message: 'User not found' })
      
      const comments = await Comments.create({
        userId: user,
        body
      })
      
      await Post.findByIdAndUpdate(post._id, { $push: { comments: comments } },)
      
      res.status(201).populate('user').send(comments)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al crear el comentario' })
    }
  },
  async editComments (req, res) {
    try {
      const { _id } = req.params
      const { body } = req.body

      const date = new Date().setDate(new Date().getDate() + 2)

      const comments = await Comments.findByIdAndUpdate(_id, { body, deliveryDate: date })

      res.status(200).send({ message: 'Comments update', comments })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al crear actualizar comentario' })
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query
      const getComments = await Comments.find().limit(limit).skip((page - 1) * limit)

      res.send(getComments)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al crear al obtener comentario' })
    }
  },
  async delete (req, res) {
    try {
      const { _id } = req.params
      if (!_id) return res.status(400).send({ message: 'Error _id undefinde' })

      await Comments.findByIdAndDelete(_id)

      res.status(204).send({ message: 'Comentario eliminado' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al eliminar comentario' })
    }
  }
}

export default CommentsController
