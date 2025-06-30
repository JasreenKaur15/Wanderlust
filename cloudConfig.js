const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

console.log("Cloud Name:", process.env.cloud_name);
console.log("API Key:", process.env.api_key);
console.log("API Secret:", process.env.api_secret? "loaded ✅" : "missing ❌");


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png","jpeg","jpg"], // supports promises as well
    
  },
});

module.exports={
    cloudinary,
    storage,
}