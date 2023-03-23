import { lowerCase, template } from 'lodash';
import { APIDomain, Platform, RuntimeEnvironment, StaticResourceDomain } from './constants';

const { UMI_ENV = RuntimeEnvironment.Dev } = process.env;

namespace BasicConfig {
	/**
	 * 获取接口服务地址
	 * @param platform 平台
	 * @param runtimeEnv 运行环境
	 */
	export function getApiBaseUrl(
		platform: Platform = 0,
		runtimeEnv: RuntimeEnvironment = 0
	): string {
		if (runtimeEnv === RuntimeEnvironment.Dev) {
			return '';
		}
		const compiled = template(APIDomain[platform]);
		return compiled({ environment: lowerCase(RuntimeEnvironment[runtimeEnv]) });
	}

	/**
	 * 获取静态资源访问域名
	 * @param platform 平台
	 * @param runtimeEnv 运行环境
	 * @param app 应用名称，与VOPS应用名称对应
	 */
	export function getStaticResourceDomain(
		platform: Platform = 0,
		runtimeEnv: RuntimeEnvironment = 0,
		app: string
	): string {
		if (runtimeEnv === RuntimeEnvironment.Dev) {
			return '';
		}
		const compiled = template(StaticResourceDomain[platform]);
		return compiled({ environment: lowerCase(RuntimeEnvironment[runtimeEnv]), app: app });
	}

	/**
	 * 创建代理
	 * @param prefix 需要代理的前缀接口
	 * @param target 需要代理的远程接口
	 * @param options 额外的配置，请参考 Umi Proxy
	 */
	export function createProxy(prefix: string, target: string, options: Record<string, any> = {}) {
		return {
			[`${prefix}`]: {
				target,
				changeOrigin: true,
				secure: false,
				// ws: true,
				// pathRewrite: {[`^${prefix}`]: ''},
				headers: {
					Origin: target,
					// Referer: target, // 开发环境暂时注释，为了后端移除 local，达到 cookie 共享
				},
				bypass(req: Record<string, any>) {
					req.headers.host = target.replace(/https?:\/\//, '');
				},
				...options,
			},
		};
	}

	/**
	 * 检查当前系统环境
	 * @param env 当传入环境参数，则返回比对结果，未传参数则返回当前系统环境
	 */
	export function checkRuntimeEnvironment(env?: RuntimeEnvironment): RuntimeEnvironment | boolean {
		if (env === undefined) {
			return RuntimeEnvironment[UMI_ENV];
		}
		return RuntimeEnvironment[env] === RuntimeEnvironment[UMI_ENV];
	}
}

export default BasicConfig;
