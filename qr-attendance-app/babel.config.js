module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Removed the plugin related to Tailwind CSS integration
    plugins: [],
  };
};
