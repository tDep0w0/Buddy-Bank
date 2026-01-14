// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig(__dirname);

  return {
    transformer: {
      // Nếu muốn ép dùng transformer của Expo:
      babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
      // Nếu muốn ép dùng transformer của React Native (không qua expo-cli):
      // babelTransformerPath: require.resolve("react-native-svg-transformer/react-native")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'ts', 'tsx', 'js', 'json']
    }
  };
})();
