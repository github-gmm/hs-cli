
module.exports = ({projectName, sourceName, interfaceVtrade, interfaceVbkr}) => {
  return (
`// App应用信息
export const AppInfo = {
  name: "${projectName}", // 应用名称
  systemId: "1", // 系统id
  sourceName: "${sourceName}", // 静态资源
  interfaceVtrade: "${interfaceVtrade}", // 平台接口地址域名
  interfaceVbkr: "${interfaceVbkr}", // 金融接口地址域名
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
  [Platform.VTRADE]: \`//r<%= environments %>\${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/\`,
  [Platform.VBKR]: \`//r<%= environments %>\${AppInfo.sourceName}/fe/<%= app %>/<%= environment %>/\`,
};

// 接口域名（平台和金融的不同）
export const APIDomain = {
  [Platform.VTRADE]: \`//admin<%= environment %>\${AppInfo.interfaceVtrade}\`,
  [Platform.VBKR]: \`//admin<%= environment %>\${AppInfo.interfaceVbkr}\`,
};`
  )
}
