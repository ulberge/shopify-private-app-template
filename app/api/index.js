'use strict';

var express = require('express');
var app = express();
var q = require('q');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

var Shopnode = require('shopnode');

// Basic Authentication
var shopnode = new Shopnode({
    storeHost:process.env.SHOP_URL,
    apiKey:process.env.APP_API_KEY,
    password:process.env.APP_PASSWORD,
    useBasicAuth:true
});

app.get('/', function (req, res) {
    q.resolve().then(function () {
        var getRequest = q.defer();
        shopnode.products.getAll(getRequest.makeNodeResolver());
        return getRequest.promise;
    }).spread(function (obj) {
        console.log(obj);
        res.json(200, obj);
    }).fail(function (err) {
        console.log('error: ' + err);
        res.json(500, {
            err: err
        });
    });
});

module.exports = app;