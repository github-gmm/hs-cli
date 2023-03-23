import BasicConfig from '../settings';
import { Platform, RuntimeEnvironment, AppInfo } from '../settings/constants';

const { PLATFORM, UMI_ENV } = process.env;

export const getConfig = () => {
	// 所属展业
	const platform: string = Platform[PLATFORM || 0];
	// 环境
	const appEnv: string = RuntimeEnvironment[UMI_ENV || 0];
	// 基础配置
	let conf: umiConfType = {
		define: {
			APP_ENV: appEnv,
			BASE_URL: BasicConfig.getApiBaseUrl(Platform[platform], RuntimeEnvironment[appEnv]),
			PLATFORM: platform,
			SYSTEM_ID: AppInfo['systemId'],
		},
		publicPath: BasicConfig.getStaticResourceDomain(
			Platform[platform],
			RuntimeEnvironment[appEnv],
			AppInfo['name']
		),
		runtimePublicPath: false,
	};
	// 本地开发环境移除一些设置项
	if (BasicConfig.checkRuntimeEnvironment(RuntimeEnvironment.Dev)) {
		delete conf.runtimePublicPath;
		delete conf.publicPath;
	}
	return conf;
};
