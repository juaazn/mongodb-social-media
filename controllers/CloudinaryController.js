import { destroyImage } from '../utils/cloudinary.js'
import User from '../models/User.js'

const CloudinaryController = {
  async upload (req, res) {
    try {
      if (!req.file) return res.status(400).send({ message: 'No file uploaded' })
      const image = req.file
      const _id = req.user._id

      const user = await User.findById(_id)
      if (!user) return res.status(400).send({ message: 'User not found' })

      if (user.profileImage && user.profileImage.get('filename')) {
        try {
          await destroyImage(user.profileImage.get('filename'))
        } catch (error) {
          console.error('Error eliminando imagen anterior:', error)
          return res.status(500).send({ message: 'Error deleting previous image' })
        }
      }

      user.profileImage = {
        url: image.path,
        filename: image.filename
      }

      await user.save()

      res.status(200).json({ message: 'Image updated successfully', url: image.path })
    } catch (error) {
      console.error('Error en el controlador Cloudinary: ', error)
      res.status(500).send({ message: `Error cloudinary internal server: ${error}` })
    }
  }
}

export default CloudinaryController
