import User from '../models/User.js'

const CloudinaryController = {
  async upload (req, res) {
    try {
      if (!req.file) return res.status(400).send({ message: 'No se subió ningún archivo' })
      const _id = req.user._id

      const user = await User.findById(_id)
      if (!user) return res.status(400).send({ message: 'User not found' })

      user.profileImage = req.file
      user.save()
      res.status(200).json({ message: 'Actualizado', url: req.file })
    } catch (error) {
      console.error('Error en el controlador Cloudinary: ', error)
      res.status(500).send({ message: `Error cloudinary internal server: ${error}` })
    }
  }
}

export default CloudinaryController
