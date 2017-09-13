const path = require('path');

const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const paths = {
  app: path.join(__dirname, 'app'),
  assets: path.join(__dirname, 'app', 'assets'),
  styles: path.join(__dirname, 'app', 'styles'),
  build: path.join(__dirname, 'build'),
  node_modules: path.join(__dirname, 'node_modules'),
};

const commonConfig = merge([
  {
    context: paths.app,
    entry: {
      app: './index.js',
      vendor: ['babel-polyfill'],
    },
    resolve: {
      extensions: ['.js', '.json', '.html', '.scss'],
    },
    output: {
      path: paths.build,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
  },
  parts.outputHTML(),
  parts.loadHTML(),
  // parts.loadCSS({
  //   use: [
  //     'style-loader',
  //     parts.css(),
  //     parts.post(),
  //     parts.sass({
  //       includePaths: [paths.node_modules, paths.assets],
  //     }),
  //   ],
  // }),
  parts.loadFiles(),
  parts.loadLocalAssets(),
]);

const prodConfig = merge([
  {
    devtool: 'source-map',
  },
  parts.loadJS({ include: paths.app, exclude: [paths.node_modules, /\.(spec|e2e)\.js$/] }),
  parts.extractCSS({
    use: [
      parts.css({
        minimize: true,
      }),
      parts.post(),
      parts.sass({
        includePaths: [paths.node_modules, paths.styles],
      }),
    ],
  }),
  parts.optimizeChunks(),
  parts.optimizeCode(),
]);

const devConfig = merge([
  {
    devtool: 'cheap-module-source-map',
  },
  parts.loadJS({ include: paths.app, exclude: [paths.node_modules, /\.(spec|e2e)\.js$/] }),
  parts.extractCSS({
    use: [
      parts.css(),
      parts.post(),
      parts.sass({
        includePaths: [paths.node_modules, paths.styles],
      }),
    ],
  }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.optimizeChunks(),
]);

const testConfig = merge([
  parts.loadJS({ include: paths.app, exclude: [paths.node_modules] }),
  parts.extractCSS({
    use: [
      parts.css(),
      parts.post(),
      parts.sass({
        includePaths: [paths.node_modules, paths.styles],
      }),
    ],
  }),
]);

module.exports = (env) => {
  if (env === 'production' || env === 'prod') {
    return merge(commonConfig, prodConfig);
  }
  if (env === 'testing' || env === 'test') {
    return merge(commonConfig, testConfig);
  }
  return merge(commonConfig, devConfig);
};
