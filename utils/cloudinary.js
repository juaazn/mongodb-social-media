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

export async function destroyImage (img_id) {
  await cloudinary.uploader.destroy(img_id)
}

export const upload =  multer({ storage })