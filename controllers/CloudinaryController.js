const CloudinaryController = {
  async upload (req, res) {
    try {
      if (!req.file) return res.status(400).send({ message: 'No se subió ningún archivo' })

      res.status(200).json({ message: 'Actualizado', url: req.file })
    } catch (error) {
      console.error('Error en el controlador Cloudinary: ', error)
      res.status(500).send({ message: `Error cloudinary internal server: ${error}` })
    }
  }
}

export default CloudinaryController
