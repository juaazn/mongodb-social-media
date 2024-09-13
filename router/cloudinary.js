import express from 'express'
import { upload } from '../cloudinary/config.js'
import CloudinaryController from '../controllers/CloudinaryController.js'

const cloudinary = express.Router()

cloudinary.post('/', upload.single('picture'), CloudinaryController.upload)

export default cloudinary