// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts: defaultAssetExts },
  } = await getDefaultConfig(__dirname);

  // ensure svg is handled by svg transformer and wasm is treated as an asset
  const assetExts = defaultAssetExts.filter((ext) => ext !== "svg");
  if (!assetExts.includes("wasm")) assetExts.push("wasm");

  return {
    transformer: {
      // Nếu muốn ép dùng transformer của Expo:
      babelTransformerPath:
        require.resolve("react-native-svg-transformer/expo"),
      // Nếu muốn ép dùng transformer của React Native (không qua expo-cli):
      // babelTransformerPath: require.resolve("react-native-svg-transformer/react-native")
    },
    resolver: {
      assetExts,
      sourceExts: [...sourceExts, "svg", "ts", "tsx", "js", "json"],
    },
  };
})();
