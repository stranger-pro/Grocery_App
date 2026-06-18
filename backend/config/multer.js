import multer from "multer";
import {connectCloudinary} from './cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  connectCloudinary,
  params:{
    folder:"grocery-app",
    allowed_formats:["jpg","jpeg","png","webp"],
  },
});
export const upload = multer({ storage: storage });
