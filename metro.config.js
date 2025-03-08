const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Tích hợp react-native-svg-transformer
config.transformer = {
  ...config.transformer, // Giữ lại các giá trị transformer mặc định
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

// Xuất config với NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
