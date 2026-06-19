import multer from "multer";
import {cloudinary} from './cloudinary.js';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"grocery-app",
    allowed_formats:["jpg","jpeg","png","webp"],
  },
});
export const upload = multer({ storage: storage });
