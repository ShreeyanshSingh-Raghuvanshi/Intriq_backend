// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${req.userId}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5000000 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|docx|doc/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (extname) return cb(null, true);
//     cb('Error: Only PDF/Docs allowed!');
//   }
// });

// module.exports = upload;






const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;