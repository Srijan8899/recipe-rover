import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
    try {
        if(!localFilePath){
            return null
        }
       const response =  await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        
        fs.unlinkSync(localFilePath); //removes the uploaded file from the server

        return response
    } catch (error) {

        fs.unlinkSync(localFilePath); 
        return null;
    }
}

const destroyOnCloudinary = async (publicId) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
    try {
        if(!publicId){
            return null
        }
       const response =  await cloudinary.uploader.destroy(publicId)
        return response
    } catch (error) {
        return null
    }
}

export {uploadOnCloudinary, destroyOnCloudinary}
