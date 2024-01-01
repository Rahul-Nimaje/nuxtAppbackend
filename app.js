var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var httpContext = require('express-http-context');
const cors = require('cors');
// const websocket = require('./routes/websocketConf')
var app = express();
app.set(require('./routes/websocketConf'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(httpContext.middleware);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(require('./RestApi/index'))
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
