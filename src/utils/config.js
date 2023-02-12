exports.clientConfig = {
	CONFIG_VERSION: {
		name: 'Config Version',
		value: 1.0,
	},
	THEME: {
		type: 'dropdown',
		name: 'Theme',
		options: ['classic', 'light'],
		value: 'classic',
	},
	IMAGE_SIZING: {
		type: 'dropdown',
		name: 'Image Sizing',
		options: ['classic', 'actual size'],
		value: 'classic',
	},
	GRAPH_RENDER_LIMIT: {
		type: 'number',
		name: 'Graph Render Limit',
		value: 100,
	},
};

exports.backendConfigMap = {
	FULLSCREEN: {
		type: 'boolean',
		name: 'Fullscreen on Startup',
	},
	OPEN_URLS_IN_BROWSER: {
		type: 'boolean',
		name: 'Open URLs in Browser',
	},
	HTTP_CACHE: {
		type: 'boolean',
		name: 'Http Cache',
	},
	CLEAR_CACHE_ON_START: {
		type: 'boolean',
		name: 'Clear Cache On Startup',
	},
	ENABLE_HARDWARE_ACCELERATION: {
		type: 'boolean',
		name: 'Hardware Acceleration',
	},
	DEBUG: {
		type: 'boolean',
		name: 'Debug Mode',
	},
	SERVER_PORT: {
		type: 'number',
		name: 'Server Port',
	},
	CLIENT_PORT: {
		type: 'number',
		name: 'Client Port',
	},
	CLIENT_BASE: {
		type: 'string',
		name: 'Client Base',
	},
	APP_NAME: {
		type: 'string',
		name: 'App Name',
	},
};

exports.backendConfigFilter = [
	'JWT_SECRET',
	'REFRESH_TOKEN_SECRET',
	'CONFIG_VERSION',
	'CLIENT_PORT',
	'SERVER_PORT',
	'CLIENT_BASE',
	'APP_NAME',
	'DEBUG',
	'CLEAR_CACHE_ON_START',
];
