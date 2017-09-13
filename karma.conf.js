// Karma configuration
/* eslint-disable func-names */
const webpackConfig = require('./webpack.config')('test');

// Needs to be added due to some third party modules
// https://github.com/webpack-contrib/karma-webpack/issues/173
// https://github.com/webpack-contrib/karma-webpack/issues/231
// etc. etc.
delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],
    // list of files / patterns to load in the browser
    files: [
      { pattern: './app/index.spec.js', watched: false },
    ],
    // list of files to exclude
    exclude: [
      'node_modules',
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/index.spec.js': ['webpack', 'sourcemap'],
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE ||
    // config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Additional variables
    client: {
      clearContext: false,
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  });
};
