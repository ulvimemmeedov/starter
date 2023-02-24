var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var limitAccess = require('./middleware/security/limitAccess');
var mongoSanitize = require('express-mongo-sanitize');
var helmet = require('helmet');
var xss = require('xss-clean');
var hpp = require('hpp');
var cors = require('cors');
var session = require('express-session');
var errorHandler = require('./helpers/errors/errorHandler');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Max Listener setup
app.setMaxListeners = Infinity;

// Security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(
    limitAccess({
        windowMs: 10 * 60 * 1000, // 10 Minutes
        max: 500,
    })
);
app.use(hpp());
app.use(cors());
// app.use(
//     session({
//         key: `${process.env.SESSION_KEY}` + `${Math.floor(Math.random() * 10)}`,
//         secret: process.env.SESSION_SECRET,
//         cookie: {
//             maxAge: 2678400000, // 31 days
//         },
//         saveUninitialized: true,
//         resave: true,
//     })
// );

app.use(logger('dev'));
app.use(
    express.json({
        limit: '50mb',
    })
);
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res, next) => {
    req.locals = {
        token: '',
        user: {},
    };
    res.set(
        'Content-Security-Policy',
        "default-src *; style-src 'self' http://* 'unsafe-inline';img-src 'self' data: ; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    );

    next();
});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
