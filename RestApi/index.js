var router = require('express').Router();
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
const uploadFile = require('../routes/imageUpload')
const socketConnect=require('../routes/socketrouter')
router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/upload', uploadFile);
router.use('/socket', socketConnect);
module.exports=router