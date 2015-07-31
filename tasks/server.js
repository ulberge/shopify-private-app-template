'use strict';

var spawn = require('child_process').spawn;

module.exports = function (grunt) {
    grunt.registerTask('server', (function () {
        return function () {
            var server = spawn('node', ['server'], {
                stdio: 'inherit'
            });

            process.once('SIGINT', function () {
                process.exit('SIGINT');
            });
            process.once('SIGTERM', function () {
                process.exit('SIGTERM');
            });

            process.once('exit', function (code) {
                server.kill(code);
            });
        };
    }()));
};