const router = require('express').Router();
const upload = require('../multer/index')
const path = require('path');
const PORT=3001
router.post('/image',upload.single('file'),async (req, res) => {
    const imagePath = path.join(__dirname, 'public','images', req.file.filename);
    const imageLink = `http://localhost:${PORT}/${path.relative(__dirname, imagePath)}`;
    // res.setHeader('Content-Type', 'image/png');
    res.send(imageLink);
})

module.exports = router