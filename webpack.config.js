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
          { context: 'betterttv/build/', to: "./bttv", from: '**', force: true,
         },
        ]
      }),
    ],
  },
];