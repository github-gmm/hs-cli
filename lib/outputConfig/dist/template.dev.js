"use strict";

module.exports = function (_ref) {
  var projectName = _ref.projectName,
      sourceName = _ref.sourceName,
      interfaceVtrade = _ref.interfaceVtrade,
      interfaceVbkr = _ref.interfaceVbkr;
  return "// App\u5E94\u7528\u4FE1\u606F\nexport const AppInfo = {\n  name: \"".concat(projectName, "\", // \u5E94\u7528\u540D\u79F0\n  systemId: \"1\", // \u7CFB\u7EDFid\n  sourceName: \"").concat(sourceName, "\", // \u9759\u6001\u8D44\u6E90\n  interfaceVtrade: \"").concat(interfaceVtrade || interfaceVbkr, "\", // \u5E73\u53F0\u63A5\u53E3\u5730\u5740\u57DF\u540D\n  interfaceVbkr: \"").concat(interfaceVbkr || interfaceVtrade, "\", // \u91D1\u878D\u63A5\u53E3\u5730\u5740\u57DF\u540D\n};\n\nexport enum RuntimeEnvironment {\n  Dev,\n  Daily,\n  Feature,\n  Beta,\n  Prod,\n}\n\nexport enum Platform {\n  VTRADE,\n  VBKR,\n}\n\n// \u9759\u6001\u8D44\u6E90\uFF08\u5E73\u53F0\u548C\u91D1\u878D\u7684\u76F8\u540C\uFF09\nexport const StaticResourceDomain = {\n  [Platform.VTRADE]: `//r<%= environments %>${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/`,\n  [Platform.VBKR]: `//r<%= environments %>${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/`,\n};\n\n// \u63A5\u53E3\u57DF\u540D\uFF08\u5E73\u53F0\u548C\u91D1\u878D\u7684\u4E0D\u540C\uFF09\nexport const APIDomain = {\n  [Platform.VTRADE]: `//admin<%= environment %>${AppInfo.interfaceVtrade}`,\n  [Platform.VBKR]: `//admin<%= environment %>${AppInfo.interfaceVbkr}`,\n};");
};