// App应用信息
export const AppInfo = {
  name: "demo", // 应用名称
  systemId: "1", // 系统id
  sourceName: ".xxx.com", // 静态资源
  interfaceVtrade: ".xxx.com.cn", // 平台接口地址域名
  interfaceVbkr: "undefined", // 金融接口地址域名
};

export enum RuntimeEnvironment {
  Dev,
  Daily,
  Feature,
  Beta,
  Prod,
}

export enum Platform {
  VTRADE,
  VBKR,
}

// 静态资源（平台和金融的相同）
export const StaticResourceDomain = {
  [Platform.VTRADE]: `//r<%= environments %>${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/`,
  [Platform.VBKR]: `//r<%= environments %>${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/`,
};

// 接口域名（平台和金融的不同）
export const APIDomain = {
  [Platform.VTRADE]: `//admin<%= environment %>${AppInfo.interfaceVtrade}`,
  [Platform.VBKR]: `//admin<%= environment %>${AppInfo.interfaceVbkr}`,
};