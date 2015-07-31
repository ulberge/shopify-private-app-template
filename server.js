'use strict';

var app = require('./app');

app.listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.PORT);
});
