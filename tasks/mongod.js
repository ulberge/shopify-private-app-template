'use strict';

var spawn = require('child_process').spawn;

module.exports = function (grunt) {
    grunt.registerTask('mongod', (function () {
        return function () {
            var mongod = spawn('mongod', [], {
                stdio: 'inherit'
            });

            process.once('SIGINT', function () {
                process.exit('SIGINT');
            });
            process.once('SIGTERM', function () {
                process.exit('SIGTERM');
            });

            process.once('exit', function (code) {
                mongod.kill(code);
            });
        };
    }()));
};