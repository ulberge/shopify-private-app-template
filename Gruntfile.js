'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');
    // show elapsed time at the end
    require('time-grunt')(grunt);

    var DEFAULT_PORT = 3000;

    grunt.initConfig({
        env: {
            development: {
                PORT: DEFAULT_PORT,
                MONGOHQ_URL: 'mongodb://localhost/shopify-private-app-template',
                src: '.env',
                URL: 'http://localhost:' + DEFAULT_PORT
            },
            test: {
                MONGOHQ_URL: 'mongodb://localhost/shopify-private-app-template-test',
                src: '.env'
            },
            travis: {
                MONGOHQ_URL: 'mongodb://localhost/shopify-private-app-template-test'
            }
        },
        watch: {
            coffee: {
                files: [
                    'public/src/**/*.coffee'
                ],
                tasks: [
                    'coffeelint',
                    'coffee'
                ]
            },
            handlebars: {
                files: [
                    'public/src/**/*.handlebars'
                ],
                tasks: [
                    'handlebars'
                ]
            },
            stylus: {
                files: ['public/src/**/*.styl'],
                tasks: [
                    'stylus'
                ]
            },
            styles: {
                files: ['public/styles/{,*/}*.css'],
                tasks: ['autoprefixer']
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    amd: true,
                    processName: function(filename) {
                        var path = require('path');
                        return path.basename(filename, '.handlebars');
                    }
                },
                files: {
                    'public/lib/templates.js': 'public/src/**/*.handlebars'
                }
            }
        },
        coffee: {
            compile: {
                cwd: 'public/src/',
                src: ['**/*.coffee'],
                dest: 'public/lib/',
                ext: '.js',
                expand: true,
                options: {
                    runtime: 'inline',
                    sourceMap: true
                }
            }
        },
        coffeelint: {
            app: {
                files: {
                    src: [
                        'public/src/**/*.coffee',
                        '!public/bower_components/**/*'
                    ]
                },
                options: {
                    'max_line_length': {
                        level: 'warn'
                    }
                }
            }
        },
        jshint2: {
            server: {
                src: [
                    '**/*.js',
                    '!node_modules/**/*.js',
                    '!public/**/*.js',
                    '!test/public/require-config.js'
                ],
                options: {
                    jshint: {
                        'node': true,
                        'browser': false,
                        'esnext': true,
                        'bitwise': true,
                        'camelcase': true,
                        'curly': true,
                        'eqeqeq': true,
                        'immed': true,
                        'indent': 4,
                        'latedef': true,
                        'newcap': true,
                        'noarg': true,
                        'quotmark': 'single',
                        'regexp': true,
                        'undef': true,
                        'unused': true,
                        'strict': true,
                        'trailing': true,
                        'smarttabs': true
                    },
                    globals: {
                        'describe': false,
                        'it': false,
                        'beforeEach': false,
                        'afterEach': false,
                        'before': false,
                        'console': false,
                        'expect': false,
                        'define': false,
                        'spyOn': false,
                        'waitsFor': false,
                        '$': false,
                        'runs': false
                    }
                }
            }
        },
        jasmine: {
            all: 'test/public/index.html'
        },
        mochaTest: {
            files: [
                'test/app/**/*.js',
                'test/models/**/*.js',
                'test/utils/**/*.js'
            ]
        },
        mochaTestConfig: {
            options: {
                reporter: 'json-stream'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: 'public/scripts/main.js'
            }
        },
        stylus: {
            dist: {
                options: {
                    compress: true
                },
                files: {
                    'public/styles/main.css': 'public/styles/main.styl'
                }
            },
            dev: {
                options: {
                    compress: false
                },
                files: {
                    'public/styles/main.css': 'public/styles/main.styl',
                }
            }
        }
    });
    grunt.registerTask('lint', [
        'jshint2',
        'coffeelint'
    ]);
    grunt.registerTask('preprocessor', [
        'coffee',
        'handlebars',
        'stylus',
        'autoprefixer'
    ]);
    grunt.registerTask('keep-alive', function () {
        this.async();
    });
    grunt.registerTask('travis', ['lint', 'env:travis']);
    grunt.registerTask('test', ['lint', 'env:test', 'mongod']);
    grunt.registerTask('default', ['env:development', 'lint', 'preprocessor', 'mongod', 'server', 'watch']);
};
