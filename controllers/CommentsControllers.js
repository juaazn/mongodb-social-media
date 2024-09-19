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
        userId: userName,
        userName: userName.name,
        body,
        deliveryDate: new Date().setDate(new Date().getDate() + 2)
      })
      
      await Post.findByIdAndUpdate(postId._id, { $push: { comments: comments } },)
      
      res.status(201).send(comments)
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
