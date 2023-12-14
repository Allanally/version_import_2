const path = require('path');

module.exports = {


  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      fs: false,
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/')
    }
  }
};
