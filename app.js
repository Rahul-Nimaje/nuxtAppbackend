var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var httpContext = require('express-http-context');
const authtokenChecker=require('./middleware/auth')
const cors = require('cors');
var app = express();
// const http = require('http');
// const socketIO = require('socket.io');
const socketIoConf=require('./routes/websocketConf')
// app.set(require('./routes/websocketConf'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(httpContext.middleware);
// app.use(
//   cors({origin: ['http://localhost:', 'http://127.0.0.1:8888']})
// );
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(require('./RestApi/index'))
app.use(authtokenChecker)
socketIoConf(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // Handle the error
  console.error(err.message);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
