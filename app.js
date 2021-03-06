var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var sessionAuth = require('./middlewares/sessionAuth');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(session({
  secret : 'terminal',
  resave : true,
  saveUninitialized : true,
  cookie : {maxAge:600000}
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sessionAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect('mongodb+srv://dbUser:User1234@cluster0.kvhle.mongodb.net/terminal?retryWrites=true&w=majority',
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
).then(()=>{
  console.log('Connected');
})
.catch(err=>{
  console.log(err.message);
});;

module.exports = app;
