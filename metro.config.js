const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname);

// Allow Metro to bundle ONNX model files
config.resolver.assetExts.push("onnx");

module.exports = withNativeWind(config, {
    input: "./src/global.css",
});