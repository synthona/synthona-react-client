import React, { Component } from 'react';
import { connect } from 'react-redux';
// custom code
import { fetchNodes } from '../../../api/redux/actions';
import OptionListItem from './OptionListItem';
import { isElectron } from '../../../utils/environment';
import { Modal } from 'antd';
import { clientConfig, backendConfigMap, backendConfigFilter } from '../../../utils/config.js';

class OptionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topOfPage: false,
			backendConfig: null,
			clientConfig: null,
			showRestartModal: false,
		};
	}

	loadClientConfig = () => {
		return new Promise((resolve) => {
			let localClientConfig = JSON.parse(localStorage.getItem('client-config'));
			let localClientConfigVersion = localClientConfig
				? localClientConfig.CONFIG_VERSION.value
				: null;

			// if there is a new config version we are going to need to update it
			if (localClientConfigVersion === null) {
				// load default client config into state
				this.setState({ clientConfig });
				// if there's no config in local storage we will store the defaults there
				let clientConfigString = JSON.stringify(clientConfig);
				localStorage.setItem('client-config', clientConfigString);
			}
			// if there's an updated config we have to update it
			else if (clientConfig.CONFIG_VERSION.value > localClientConfigVersion) {
				// copy existing settings into new object,
				// update config_version, add new values
				let newClientConfig = {
					...clientConfig,
					...localClientConfig,
					CONFIG_VERSION: clientConfig.CONFIG_VERSION,
				};
				// update local state with the new config object
				this.setState({ clientConfig: newClientConfig });
				// stringify and save to localstorage
				let clientConfigString = JSON.stringify(newClientConfig);
				localStorage.setItem('client-config', clientConfigString);
			}
			// if config already exists and is up to date we will simply load it up
			else {
				// config already exists, load it into state
				this.setState({ clientConfig: localClientConfig });
			}
			resolve();
		});
	};
	// if this is the host device (is-electron) we'll get the backend config & client config
	// otherwise we'll only load the client config. if there's no client config in localstorage
	// we need to generate it with default values to make it available
	loadOptions = async () => {
		await this.loadClientConfig();
		if (isElectron) {
			// load backend config
			this.setState({
				backendConfig: isElectron ? JSON.parse(localStorage.getItem('backend-config')) : null,
			});
		}
	};

	componentDidMount() {
		// reload backend config
		if (window.api) {
			window.api.send('toMain', { action: 'get-backend-config' });
		}
		// load everything else
		this.loadOptions();
	}

	// a function to update the config values to be passed into each
	updateClientConfigValue = (keyName, newValue) => {
		let existingClientConfig = this.state.clientConfig;
		let newConfig = {
			...existingClientConfig,
			[keyName]: {
				...existingClientConfig[keyName],
				value: newValue,
			},
		};
		this.setState({ clientConfig: newConfig });
		window.localStorage.setItem('client-config', JSON.stringify(newConfig));
	};

	// a function to update the config values to be passed into each
	updateBackendConfigValue = (keyName, newValue) => {
		let existingBackendConfig = this.state.backendConfig;
		let newConfig = {
			...existingBackendConfig,
			[keyName]: newValue,
		};
		this.setState({ backendConfig: newConfig, showRestartModal: true });
		// update the values in local storage
		window.localStorage.setItem('backend-config', JSON.stringify(newConfig));
		// we also need to send the updated version to the backend app
		if (window.api) {
			window.api.send('toMain', {
				action: 'update-backend-config',
				updates: newConfig,
			});
		}
	};

	restartHandler = () => {
		if (window.api) {
			window.api.send('toMain', {
				action: 'restart-app',
			});
		}
	};

	renderOptionsList = () => {
		// prepare the options lists
		let configList = [];
		let backendConfig = this.state.backendConfig;
		let clientConfig = this.state.clientConfig;
		// let's go ahead and load all this up
		if (!!backendConfig) {
			// load backend config values
			for (var backendKey in backendConfig) {
				if (!backendConfigFilter.includes(backendKey)) {
					configList.push(
						<OptionListItem
							key={backendConfigMap[backendKey].name}
							keyName={backendKey}
							type={backendConfigMap[backendKey].type}
							name={backendConfigMap[backendKey].name}
							value={backendConfig[backendKey]}
							onChange={this.updateBackendConfigValue}
						/>
					);
				}
			}
		}
		// add client config values
		for (var clientKey in clientConfig) {
			if (clientKey !== 'CONFIG_VERSION') {
				configList.push(
					<OptionListItem
						key={clientConfig[clientKey].name}
						keyName={clientKey}
						name={clientConfig[clientKey].name}
						value={clientConfig[clientKey].value}
						type={clientConfig[clientKey].type}
						optionObject={clientConfig[clientKey]}
						onChange={this.updateClientConfigValue}
					/>
				);
			}
		}
		return configList;
	};

	render() {
		return (
			<div className='options-list-container'>
				<ul className='options-list' style={{ padding: 0, margin: 0 }}>
					{this.renderOptionsList()}
				</ul>
				<Modal
					title='Restart Required'
					visible={this.state.showRestartModal}
					className='delete-modal'
					centered
					onOk={this.restartHandler}
					afterClose={() => document.body.style.removeProperty('overflow')}
					okType='danger'
					okText='Restart'
					cancelText='Wait'
					closable={false}
					onCancel={() => this.setState({ showRestartModal: false })}
				>
					<p>
						This configuration change requires an app restart to take effect, do you want to restart
						now or wait?
					</p>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		query: state.nodes.query,
		totalNodes: state.nodes.totalItems,
		isFetching: state.nodes.isFetching,
	};
};

export default connect(mapStateToProps, { fetchNodes })(OptionsList);
