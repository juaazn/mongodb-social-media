import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req, file) => 'ecommerce',
  }
})

export async function destroyImage (public_id) {
  try {
    await cloudinary.uploader.destroy(public_id)
  } catch (error) {
    console.error('Error eliminando imagen en Cloudinary:', error)
    throw new Error('Error eliminando la imagen en Cloudinary')
  }
}

export const upload =  multer({ storage })
