'use strict';

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var express = require('express');
var app = express();
var passport = require('passport');

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./app/api'));
app.use(require('./app/ui'));

app.use(function (req, res) {
    res.send(404);
});

/*jshint unused:false */
app.use(function (err, req, res, next) {
    res.send(500, {
        err: err.stack
    });
});
/*jshint unused:true */
module.exports = app;
