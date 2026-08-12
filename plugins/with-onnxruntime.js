const {
    withMainApplication,
    createRunOncePlugin,
} = require("expo/config-plugins");

function withOnnxruntime(config) {
    return withMainApplication(config, (config) => {
        const { modResults } = config;

        if (modResults.language !== "java" && modResults.language !== "kt") {
            return config;
        }

        const importLine =
            "import ai.onnxruntime.reactnative.OnnxruntimePackage";

        if (!modResults.contents.includes(importLine)) {
            modResults.contents = modResults.contents.replace(
                /import com\.facebook\.react\.PackageList/,
                `import com.facebook.react.PackageList\n${importLine}`
            );
        }

        if (!modResults.contents.includes("OnnxruntimePackage()")) {
            modResults.contents = modResults.contents.replace(
                /(PackageList\(this\)\.packages\.apply\s*\{)/,
                `$1\n            add(OnnxruntimePackage())`
            );
        }

        return config;
    });
}

module.exports = createRunOncePlugin(
    withOnnxruntime,
    "with-onnxruntime",
    "1.0.0"
);