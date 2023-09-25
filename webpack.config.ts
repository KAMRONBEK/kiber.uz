module.exports = {
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
