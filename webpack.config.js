// webpack.config.js
module.exports = {
  // ... other configurations
  module: {
    rules: [
      // ... other rules
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
};
