const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure with the credentials you provided
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // You must add this to your .env
  api_key: "935374376272589",
  api_secret: "2Eilwde5TLSiriFFXywSC9GTvAc"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'intriq_resumes',
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'raw' // Important for non-image files like PDFs
  },
});

module.exports = { cloudinary, storage };