// Import Module
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Import Middleware
const errorMiddleware = require('./utils/error.middleware');

// Activate Express App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Router
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFoundHandler);
// error handler
app.use(errorMiddleware.errorHandler);

module.exports = app;
