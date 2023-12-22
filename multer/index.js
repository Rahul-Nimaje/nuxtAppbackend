const multer = require('multer');


// Set up Multer storage and limits
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // The folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(' ','_')); // Unique file name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;