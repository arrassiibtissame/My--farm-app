const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Fix for MIME type issues
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "path": false,
    "crypto": false
  };

  return config;
}; 