var JavaScriptObfuscator = require('javascript-obfuscator');
var obfuscationResult = JavaScriptObfuscator.obfuscate(
    process.argv[2],
    {
        compact: true,
        controlFlowFlattening: true
    }
);

console.log(obfuscationResult.getObfuscatedCode());