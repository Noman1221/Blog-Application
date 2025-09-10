import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();
console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog",
        allowed_formats: ["png", "jpg", "jpeg"], // Note: allowed_formats (not Format)
    },
});

export { cloudinary, storage };

