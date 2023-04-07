let clientConfigVersion = 1.0;

let clientConfig = [
	{
		storageKey: 'theme',
		name: 'Theme',
		type: 'dropdown',
		options: ['classic', 'light', 'translucent'],
		value: 'classic',
	},
	{
		storageKey: 'image-sizing',
		name: 'Image Sizing',
		type: 'dropdown',
		options: ['classic', 'actual size', 'fit-vertically'],
		value: 'classic',
	},
	{
		storageKey: 'quill-document-width',
		name: 'Document Page Width',
		type: 'dropdown',
		options: ['classic', 'full width'],
		value: 'full width',
	},
	{
		storageKey: 'link-mode',
		name: 'Link Mode',
		type: 'dropdown',
		options: ['unidirectional', 'bidirectional'],
		value: 'unidirectional',
	},
	{
		storageKey: 'graph-render-limit',
		name: 'Graph Render Limit',
		type: 'number',
		value: 100,
	},
];

exports.loadClientConfig = () => {
	console.log('loading the client config from our special new function');
	// return new Promise((resolve) => {
	let localConfigVersion = localStorage.getItem('client-config-version');
	let configArray;
	// check to see if our version is up to date or not
	if (clientConfigVersion <= localConfigVersion) {
		// we're going to loop through our 'config array' definitions and load them from localstorage
		configArray = clientConfig.map((item) => {
			let configValue = JSON.parse(localStorage.getItem(item.storageKey));
			// handle case where a config item is missing
			if (!configValue) {
				// if the config has been tampered with we are going to run the 'update' case
				localStorage.clear('client-config-version');
				window.location.reload();
			}
			// load the configItem value into the render template
			item.value = configValue;
			// return the item
			return item;
		});
	} else {
		// loop through clientConfig definitions and store the default values into local storage
		configArray = clientConfig.map((item) => {
			let key = item.storageKey;
			// store the value in local storage
			localStorage.setItem(key, JSON.stringify(item.value));
			// return value to array
			return item;
		});
		// update the client-config-version to the latest
		localStorage.setItem('client-config-version', clientConfigVersion);
	}
	return configArray;
};

// some mappings for backend config stuff
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
