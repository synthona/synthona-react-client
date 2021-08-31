import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { isElectron } from '../../utils/environment';
import { Link } from 'react-router-dom';
import { Layout, Button, Input, Select, Icon, message } from 'antd';
// custom code
import { validUrl, isImageUrl } from '../../utils/validation';
import './css/IOBar.less';
import {
	signOut,
	linkFileNodes,
	createUrlNode,
	createNode,
	searchNodes,
	showComponent,
	hideComponent,
} from '../../api/redux/actions';
// destructure antd components
const { Header } = Layout;
const { Option } = Select;

class IOBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			nodeTypes: this.props.query.type || 'all',
			createType: null,
			queryType: null,
			inputMode: 'query',
			modeIcon: 'search',
			placeholder: 'query',
		};
	}
	// show modal to confirm deletion
	toggleInputMode = () => {
		if (this.state.inputMode === 'query') {
			this.setState({
				inputMode: 'create',
				modeIcon: 'plus',
				placeholder: 'create',
				nodeTypes: 'text',
			});
		} else {
			this.setState({
				inputMode: 'query',
				modeIcon: 'search',
				placeholder: 'query',
				nodeTypes: 'all',
			});
		}
	};

	toggleMainSider = async () => {
		if (this.props.mainSider) {
			this.props.hideComponent('mainSider');
		} else {
			this.props.showComponent('mainSider');
		}
	};

	renderCreateFileNodeOption = () => {
		if (isElectron() === true) {
			return <Option value='file'>files</Option>;
		}
	};

	// handle text input
	commandHandler = () => {
		switch (this.state.inputMode) {
			case 'query':
				return this.props.searchNodes({
					searchQuery: this.state.input,
					type: this.state.nodeTypes,
				});
			case 'create':
				return this.createNodeHandler();
			default:
				return;
		}
	};
	// handle the creation of different node types
	createNodeHandler = () => {
		var linkedNode;
		if (this.props.activeNode) {
			linkedNode = JSON.stringify(this.props.activeNode);
		}
		switch (this.state.nodeTypes) {
			case 'text':
				this.props.createNode({
					isFile: false,
					type: 'text',
					name: this.state.input,
					preview: '',
					linkedNode,
				});
				// clear the input bar
				this.setState({ input: '' });
				// redirect
				history.push('/');
				break;
			case 'file':
				this.selectLocalFile(linkedNode);
				break;
			case 'url':
				// if the URL is an image add an image node
				if (isImageUrl(this.state.input)) {
					this.props.createNode({
						isFile: false,
						type: 'image',
						name: this.state.input,
						preview: this.state.input,
						content: this.state.input,
						linkedNode,
					});
					this.setState({ input: '' });
					// otherwise add a regular URL
				} else if (validUrl(this.state.input)) {
					this.props.createUrlNode({
						isFile: false,
						type: 'url',
						name: this.state.input,
						preview: this.state.input,
						path: this.state.input,
						content: this.state.input,
						linkedNode,
					});
					// clear the input bar
					this.setState({ input: '' });
				} else {
					message.error('You must enter a valid URL', 1);
				}
				// redirect
				history.push('/');
				break;
			case 'collection':
				this.props.createNode({
					isFile: false,
					type: 'collection',
					name: this.state.input,
					preview: '',
					content: this.state.input,
					linkedNode,
				});
				// clear the input bar
				this.setState({ input: '' });
				// redirect
				history.push('/');
				break;
			default:
				return;
		}
	};

	// select an image.
	selectLocalFile = (linkedNode) => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('multiple', true);
		input.click();
		// Listen for uploading local file, then save to server
		input.onchange = async () => {
			let fileList = [];
			for (let file of input.files) {
				fileList.push({ name: file.name, path: file.path, type: file.type });
			}
			await this.props.linkFileNodes(fileList, linkedNode);
			// clear the input bar
			this.setState({ input: '' });
			history.push('/');
		};
	};

	// include an "all" option for queries
	renderSelectBefore = () => {
		if (this.state.inputMode === 'query') {
			return (
				<Select
					showSearch
					showArrow={false}
					value={this.state.nodeTypes}
					onChange={(value) => this.setState({ nodeTypes: value })}
				>
					<Option value='all'>all</Option>
					<Option value='url'>urls</Option>
					<Option value='file'>file</Option>
					<Option value='text'>text</Option>
					<Option value='image'>images</Option>
					<Option value='package'>discs</Option>
					<Option value='collection'>collections</Option>
				</Select>
			);
		} else {
			// exclude "all" option for creating nodes
			return (
				<Select
					showSearch
					showArrow={false}
					value={this.state.nodeTypes}
					onChange={(value) => this.setState({ nodeTypes: value })}
				>
					<Option value='text'>text</Option>
					{this.renderCreateFileNodeOption()}
					<Option value='url'>url</Option>
					<Option value='collection'>collection</Option>
				</Select>
			);
		}
	};

	render() {
		return (
			<div>
				<Header className='page-header'>
					<ul className='nav-list'>
						<li className='nav-item io-sider-button mobile-visible' style={{ marginRight: '0' }}>
							<Button type='default' shape='circle' onClick={(e) => this.toggleMainSider()}>
								<Icon type={'bars'} theme='outlined' />
							</Button>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.4rem' }}>
							<Link type='default' to={`/graph`}>
								<Icon
									type={'deployment-unit'}
									theme='outlined'
									// style={{ color: '#ec486c' }}
								/>
							</Link>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.5rem' }}>
							<Link type='default' to={`/`}>
								<Icon
									type={'home'}
									theme='filled'
									// style={{ color: '#3ce458' }}
								/>
							</Link>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.1rem' }}>
							<Link type='default' to={`/pins`} style={{ marginRight: '0.3rem' }}>
								<Icon
									type={'star'}
									theme='filled'
									// style={{ color: 'yellow' }}
								/>
							</Link>
						</li>
						<li className='nav-item create-node-button'>
							<Button type='default' shape='circle' onClick={(e) => this.toggleInputMode()}>
								<Icon type={this.state.modeIcon} theme='outlined' />
							</Button>
						</li>
						<li className='nav-search'>
							<Input
								onPressEnter={(value, event) => this.commandHandler()}
								maxLength={500}
								value={this.state.input}
								onChange={(e) => this.setState({ input: e.target.value })}
								defaultValue={this.props.query.searchQuery || ''}
								placeholder={this.state.placeholder}
								addonBefore={this.renderSelectBefore()}
								className='nav-search-input'
							/>
						</li>
					</ul>
				</Header>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		query: state.nodes.query,
		mainSider: state.components.componentList['mainSider'],
		activeNode: state.nodes.activeNode,
	};
};

export default connect(mapStateToProps, {
	signOut,
	searchNodes,
	createNode,
	linkFileNodes,
	createUrlNode,
	showComponent,
	hideComponent,
})(IOBar);
