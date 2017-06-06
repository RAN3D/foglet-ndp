// Karma configuration
// Generated on Thu Nov 03 2016 06:11:50 GMT+0100 (Paris, Madrid)
'use strict';
const signaling = require('foglet-signaling-server');

module.exports = function (config) {
  config.set({
    hostname: 'localhost',
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'browserify', 'mocha', 'chai', 'express-http-server' ],
    plugins: [
      'karma-browserify',
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-firefox-launcher',
      'karma-express-http-server'
    ],
    // list of files / patterns to load in the browser
    files: [
      // './node_modules/spray-wrtc/build/spray-wrtc.bundle.js',
      'http://localhost:4000/socket.io/socket.io.js',
      'tests/status-queue-test.js',
      'tests/laddaTest.js',
    ],
    preprocessors: {
      'tests/status-queue-test.js' : [ 'coverage', 'browserify' ],
      'tests/laddaTest.js' : [ 'coverage', 'browserify' ]
    },
    // list of files to exclude
    exclude: [
      'externals/**/*.js'
    ],
    // browserify with babelify
    browserify: {
      debug: true,
      transform: [ [ 'babelify', {presets: [ 'es2015' ]} ], 'browserify-istanbul' ],
      // configure: function (bundle) {
      // 	bundle.on('prebundle', function () {
      // 		bundle.external([ 'spray-wrtc', 'foglet' ]);
      // 	});
      // }
    },
    extensions: [ '.js' ],
    proxies : {
      './': 'http://localhost:3000'
    },
    port: 3001,
    expressHttpServer: {
      port: 4001,
      // this function takes express app object and allows you to modify it
      // to your liking. For more see http://expressjs.com/4x/api.html
      appVisitor: signaling
    },
    reporters: [ 'coverage', 'mocha' ],
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text', subdir: '.', file: 'summary-text.txt' },
        { type: 'text-summary', subdir: '.' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    autoWatch: true,
    browserNoActivityTimeout:60000,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'Firefox' ],
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
