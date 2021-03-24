let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let multer = require('multer');
let upload = multer();
const session = require('express-session');
const config = require('./config');

let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: "cfvzrewagffgasewgrweage",
      resave: true,
      saveUninitialized: false,
    })
);

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

