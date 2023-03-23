import routes from './libs/routes';
import proxy from './libs/proxy';
import { getConfig } from './libs/common';

// 公共配置
export default {
	npmClient: 'yarn',
	hash: true,
	fastRefresh: true,
	// 开启antd组件 https://umijs.org/docs/max/antd
	antd: {},
	// 开启请求 https://umijs.org/docs/max/request
	request: {},
	// 数据流 https://umijs.org/docs/max/data-flow
	model: {},
	// 全局初始状态 https://umijs.org/docs/max/data-flow
	initialState: {},
	// 子应用配置 https://umijs.org/docs/max/micro-frontend
	qiankun: {
		slave: {},
	},
	// 国际化 https://umijs.org/docs/max/i18n
	locale: {
		antd: true,
		baseNavigator: true,
		baseSeparator: '-',
		default: 'zh-CN',
	},
	// 代理
	proxy,
	// 路由
	routes,
	// 通用的一些业务配置
	...getConfig(),
};
