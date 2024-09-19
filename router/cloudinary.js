import express from 'express'
import { authentication } from '../middlewares/authentication.js'
import { upload } from '../cloudinary/config.js'
import CloudinaryController from '../controllers/CloudinaryController.js'

const cloudinary = express.Router()

cloudinary.post('/image', authentication, upload.single('picture'), CloudinaryController.upload)

export default cloudinary