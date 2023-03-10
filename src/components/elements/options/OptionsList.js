import React, { Component } from 'react';
import { connect } from 'react-redux';
// custom code
import { fetchNodes } from '../../../api/redux/actions';
import OptionListItem from './OptionListItem';
import { isElectron } from '../../../utils/environment';
import { Modal } from 'antd';
import { backendConfigMap, backendConfigFilter, loadClientConfig } from '../../../utils/config.js';

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

	// if this is the host device (is-electron) we'll get the backend config & client config
	// otherwise we'll only load the client config. if there's no client config in localstorage
	// we need to generate it with default values to make it available
	loadOptions = () => {
		let clientConfigValues = loadClientConfig();
		this.setState({ clientConfig: clientConfigValues });
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
		// loop through existing config to update it
		let newConfig = existingClientConfig.map((item) => {
			// when we find our value lets update it in localstorage and in our live rendered UI config object
			if (keyName === item.storageKey) {
				// update the value in this particular config object
				item.value = newValue;
				// copy it to localstorage as well
				localStorage.setItem(keyName, JSON.stringify(item));
			}
			return item;
		});
		this.setState({ clientConfig: newConfig });
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
		if (this.state.clientConfig) {
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
							keyName={clientConfig[clientKey].storageKey}
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
		}
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
