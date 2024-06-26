import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { isElectron } from '../../utils/environment';
import { Link } from 'react-router-dom';
import { Layout, Button, Input, Select, Icon, message, Tooltip } from 'antd';
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
	getRandomNode,
	clearActiveNode,
} from '../../api/redux/actions';
// destructure antd components
const { Header } = Layout;
const { Option } = Select;

class IOBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: this.props.query.searchQuery || '',
			nodeTypes: this.props.query.type || 'all',
			sortType: this.props.query.sortType,
			sortOrder: this.props.query.sortOrder,
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

	toggleSortOrder = () => {
		if (this.state.sortOrder === 'ASC') {
			this.setState({ sortOrder: 'DESC' });
			localStorage.setItem('sortOrder', 'DESC');
		} else {
			this.setState({ sortOrder: 'ASC' });
			localStorage.setItem('sortOrder', 'ASC');
		}
	};

	renderCreateFileNodeOption = () => {
		if (isElectron() === true) {
			return <Option value='file'>files</Option>;
		}
	};

	// handle text input
	commandHandler = (e) => {
		e.target.blur();
		switch (this.state.inputMode) {
			case 'query':
				return this.props.searchNodes({
					searchQuery: this.state.input || '',
					type: this.state.nodeTypes,
					sortType: this.state.sortType,
					sortOrder: this.state.sortOrder,
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
				if (isElectron()) {
					this.selectElectronFile();
				} else {
					this.selectLocalFile(linkedNode);
				}
				break;
			case 'folder':
				if (isElectron()) {
					this.selectElectronFolder();
				}
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

	selectElectronFile = () => {
		if (window.api) {
			window.api.send('toMain', { action: 'show-file-picker' });
		}
	};

	selectElectronFolder = () => {
		if (window.api) {
			window.api.send('toMain', { action: 'show-folder-picker' });
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
				fileList.push({ name: file.name, path: file.path });
			}
			await this.props.linkFileNodes(fileList, linkedNode);
			// clear the input bar
			this.setState({ input: '' });
			history.push('/');
		};
	};

	renderCreateFolderOption = () => {
		if (isElectron() === true) {
			return <Option value='folder'>folders</Option>;
		}
	};

	// include an "all" option for queries
	renderSelectBefore = () => {
		if (this.state.inputMode === 'query') {
			return (
				<Select
					showSearch
					showArrow={false}
					value={this.state.nodeTypes}
					onChange={(value) => {
						this.setState({ nodeTypes: value });
					}}
				>
					<Option value='all'>all</Option>
					<Option value='url'>urls</Option>
					<Option value='file'>file</Option>
					<Option value='folder'>folder</Option>
					<Option value='text'>text</Option>
					<Option value='image'>images</Option>
					<Option value='package'>packages</Option>
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
					onChange={(value) => {
						this.setState({ nodeTypes: value });
					}}
				>
					<Option value='text'>text</Option>
					<Option value='url'>url</Option>
					{this.renderCreateFileNodeOption()}
					{this.renderCreateFolderOption()}
					<Option value='collection'>collection</Option>
				</Select>
			);
		}
	};

	// we're going to render the far-right side of the input bar
	// which includes all the sort selection variables and buttons
	renderSelectAfter = () => {
		return (
			<div className='io-input-sort'>
				<Input.Group>
					<Select
						showSearch
						showArrow={false}
						value={this.state.sortType}
						onChange={(value) => {
							this.setState({ sortType: value });
							localStorage.setItem('sortType', value);
						}}
					>
						<Option value='recent'>
							<Icon type={'bulb'} theme='outlined' /> recent
						</Option>
						<Option value='views'>
							<Icon type={'thunderbolt'} theme='outlined' /> top
						</Option>
						<Option value='created'>
							<Icon type={'clock-circle'} theme='outlined' /> created
						</Option>
					</Select>
					<Tooltip title={this.state.sortOrder === 'DESC' ? 'a-z' : 'z-a'} mouseEnterDelay={1.1}>
						<Button className='io-input-button' onClick={() => this.toggleSortOrder()}>
							<Icon
								type={this.state.sortOrder === 'DESC' ? 'arrow-up' : 'arrow-down'}
								theme='outlined'
							/>
						</Button>
					</Tooltip>
				</Input.Group>
			</div>
		);
	};

	render() {
		return (
			<div>
				<Header className='page-header' style={this.props.fixed ? { position: 'fixed' } : null}>
					<ul className='nav-list'>
						<li className='nav-item io-sider-button mobile-visible' style={{ marginRight: '0' }}>
							<Button type='default' shape='circle' onClick={(e) => this.toggleMainSider()}>
								<Icon type={'bars'} theme='outlined' />
							</Button>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.3rem' }}>
							<Tooltip title={'home'} mouseEnterDelay={1.1}>
								<Link type='default' to={`/`}>
									<Icon
										type={'home'}
										theme='filled'
										// style={{ color: '#3ce458' }}
									/>
								</Link>
							</Tooltip>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '-0.1rem' }}>
							<Tooltip title={'graph'} mouseEnterDelay={1.1}>
								<Link
									type='default'
									to={`#`}
									onClick={() => {
										this.props.clearActiveNode();
										window.location = '/graph';
									}}
								>
									<Icon
										type={'deployment-unit'}
										theme='outlined'
										// style={{ color: '#ec486c' }}
									/>
								</Link>
							</Tooltip>
						</li>
						<li
							className='nav-item io-sider-button mobile-hidden'
							style={{ padding: '0', marginRight: '-0.1rem' }}
						>
							<Tooltip title={'random'} mouseEnterDelay={1.1}>
								<Button
									type='default'
									shape='circle'
									onClick={(e) => (window.location.href = '/random')}
								>
									<Icon
										type={'thunderbolt'}
										theme='filled'
										// style={{ color: 'yellow' }}
									/>
								</Button>
							</Tooltip>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.1rem' }}>
							<Tooltip title={'favorites'} mouseEnterDelay={1.1}>
								<Link type='default' to={`/pins`} style={{ marginRight: '0.3rem' }}>
									<Icon
										type={'star'}
										theme='filled'
										// style={{ color: 'yellow' }}
									/>
								</Link>
							</Tooltip>
						</li>
						<li className='nav-item create-node-button'>
							<Button type='default' shape='circle' onClick={(e) => this.toggleInputMode()}>
								<Icon type={this.state.modeIcon} theme='outlined' />
							</Button>
						</li>
						<li className='nav-search'>
							<Input
								onPressEnter={(value, event) => this.commandHandler(value)}
								maxLength={500}
								value={this.state.input}
								onChange={(e) => this.setState({ input: e.target.value })}
								defaultValue={this.props.query.searchQuery || ''}
								placeholder={this.state.placeholder}
								addonBefore={this.renderSelectBefore()}
								addonAfter={this.renderSelectAfter()}
								className='nav-search-input'
								id='nav-primary-search'
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
	getRandomNode,
	clearActiveNode,
})(IOBar);
