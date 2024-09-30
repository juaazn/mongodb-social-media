import Post from '../models/Post.js'
import User from '../models/User.js'
import { destroyImage } from '../utils/cloudinary.js'

const PostController = {
 async create(req, res) {
   try {
    const _id = req.user._id
    const user = await User.findById(_id)
    
    if (!user) return res.status(400).send({ message: 'Usuario no registrado' })
      const { body } = req.body
    
    const objectImage = req.file || null

    const post = await Post.create({
      image: objectImage,
      body,
      user: user._id
    })

    user.posts.push(post._id)
    user.save()
     res.status(201).send({ message: 'Post creado, correctamete', post: post })
   } catch (error) {
     console.error(error)
     res.status(500).send({ message: 'Ha habido un problema al crear el post' })
   } 
 },
  async like(req, res) {
    try {
      const { _id } = req.params
      const user = req.user._id
      const { isLike } = req.body
  
      const post = await Post.findById(_id);
      if (!post) return res.status(404).send({ message: 'Post no encontrado' })
  
      const existingLike = post.like.find(like => like.user.toString() === user.toString())
  
      if (existingLike) {
        existingLike.isLike = isLike;
      } else {
        post.like.push({ user, isLike });
      }

      await post.save();

      res.status(200).send({ message: 'Like save', post })
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Error like' })
    }
  },
  async disLike(req, res) {
    try {
      const { _id } = req.params
      const user = req.user._id
      const { isLike } = req.body
  
      const post = await Post.findById(_id);
      if (!post) return res.status(404).send({ message: 'Post no encontrado' });
  
      const userLike = post.like.find(like => like.user.toString() === user.toString());
  
      if (userLike) {
        userLike.isLike = isLike;
        await post.save();
  
        res.status(200).send({ message: 'Like actualizado a dislike', post });
      } else {
        res.status(400).send({ message: 'Este usuario no ha dado like a este post' });
      }
    } catch (err) {
      console.error(err)
      res
       .status(500)
       .send({ message: 'Error al eliminar Like' })
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query

      const product = await Post.find().populate('user').limit(limit).skip((page - 1) * limit)

      res.send(product)
    } catch (err) {
      console.log(err)
    }
  },
  async getById(req, res) {
    try {
      const { _id } = req.params

      const post = await Post.findById(_id)
      if (!post) return res.status(400).send({ message: 'post no encontrado' })
      
      res.status(200).send(post)
    } catch (error) {
      console.error(error)
    }
  },
  async getPostByName(req, res) {
    try {
      const post = await Post.findById({ _id: req.params._id })

      const title = post.title
      if (title > 20) return res.status(400).send('Búsqueda demasiado larga')

      const postByName = await Post.find({ title })

      res.status(200).send(postByName)
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'Error al obtener post por nombre',
        })
    }
  },
  async delete(req, res) {
    try {
      const { _id } = req.params

      if (!_id) return res.status(400).send({ message: 'Fallo al obtener req.params' })
      const post = await Post.findById(_id)

      const imageCode = post.image.get('filename')
      if (!imageCode) return res.status(400).send({ message: 'Imagen no encontrada' })
      destroyImage(imageCode)

      const product = await Post.findByIdAndDelete(_id)
      res.status(204).send({ product, message: 'Post deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'Error al eliminar el post',
        })
    }
  },
  async update(req, res) {
    try {
      const { title, body } = req.body

      const product = await Post.findByIdAndUpdate(
        req.params._id,
        title,
        body,
        { new: true }
      )
      res.status(200).send({ message: 'Post actualizado', product })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'No se pudo actualizar el post',
        })
    }
  },
}

export default PostController
