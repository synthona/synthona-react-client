// SPECIAL COMPONENT
// this is a special component to integrate with redux
// while also sending & recieving messages from electron
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ElectronSearch from './ElectronSearch';
import { showComponent, hideComponent } from '../../api/redux/actions';
import { message, Modal } from 'antd';
import history from '../../utils/history';

// a place to send & recieve messages to & from electron
class ElectronMessage extends Component {
	componentDidMount() {
		// load up window.api.recieve function
		if (window.api) {
			window.api.receive('fromMain', (data) => {
				switch (data.message) {
					case 'search':
						if (!this.props.electronSearchData) {
							this.props.showComponent('electronSearch');
						} else {
							this.props.hideComponent('electronSearch');
						}
						return;
					case 'update-available':
						if (!this.props.updateAvailable) {
							this.props.showComponent('updateAvailable');
						} else {
							this.props.hideComponent('updateAvailable');
						}
						return;
					case 'search-all':
						// autofocus on the search bar, if it is onscreen & not selected
						if (document.getElementById('nav-primary-search')) {
							window.scrollTo({ top: 0 });
							document.getElementById('nav-primary-search').select();
						} else {
							history.push('/');
							window.scrollTo({ top: 0 });
							document.getElementById('nav-primary-search').select();
						}
						return;
					case 'latest-version':
						message.success('Synthona Is Up To Date', 2);
						return;
					default:
						break;
				}
			});
		}
	}

	renderElectronSearch = () => {
		if (this.props.electronSearchData && this.props.electronSearchData.visible) {
			return <ElectronSearch />;
		}
	};

	renderUpdateAvailableModal = () => {
		if (this.props.updateAvailable && this.props.updateAvailable.visible) {
			return (
				<Modal
					title={'A New Version of Synthona Is Available!'}
					visible={true}
					className='signout-modal'
					centered
					onOk={(e) => window.open('http://www.yarnpoint.net', '_blank')}
					okType='primary'
					okText='Yes!'
					closable={false}
					onCancel={() => this.props.hideComponent('updateAvailable')}
				>
					<p>An upgrade is available. Do you want to know more?</p>
				</Modal>
			);
		}
	};

	render() {
		return (
			<Fragment>
				{this.renderElectronSearch()}
				{this.renderUpdateAvailableModal()}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		electronSearchData: state.components.componentList['electronSearch'],
		updateAvailable: state.components.componentList['updateAvailable'],
	};
};

export default connect(mapStateToProps, { showComponent, hideComponent })(ElectronMessage);
