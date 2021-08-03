// Import Module
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Import router
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api.routes');
const usersRouter = require('./routes/users');

// Import Middleware
const errorMiddleware = require('./utils/error.middleware');

// Activate Express App
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Router
app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFoundHandler);
// error handler
app.use(errorMiddleware.errorHandler);

module.exports = app;
