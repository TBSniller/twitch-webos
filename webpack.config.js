const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => [
  {
    //Frontend
    mode: env.production ? 'production' : 'development',

    target: 'es5',

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      index: './src/app/index.js',
      userScript: './src/app/userScript.js',
    },
    output: {
      path: path.resolve(__dirname, './dist/app'),
      filename: ({ chunk: { name } }) => (name === 'userScript') ? 'webOSUserScripts/[name].js' : '[name].js',
      chunkFormat: 'commonjs',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { context: 'assets/app/', to: "./", from: '**/*', force: true },
          { context: 'src/app/', to: "./", from: 'index.html', force: true },
          { context: 'src/app/', to: "./", from: 'webOSTVlib/*', force: true },
        ]
      }),
    ],
  },


  //Service  
  {
    mode: env.production ? 'production' : 'development',

    target: 'es5',

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      index: './src/service/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist/service'),
      filename: '[name].js',
      chunkFormat: 'commonjs',
    },
    externals: {
      'webos-service': 'commonjs2 webos-service',
      'http': 'commonjs2 http',
      'fs': 'commonjs2 fs',
      'url': 'commonjs2 url',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
//         { context: 'assets/service/', to: "./", from: '**/*', force: true },
          { context: 'betterttv/build/', to: "./http", from: '**', force: true },
          { context: 'src/service/', to: "./", from: '*.json', force: true },
        ]
      }),
    ],
  },
];