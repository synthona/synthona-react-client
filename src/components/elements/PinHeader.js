import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Button, Select, Icon } from 'antd';
// custom code
import './css/IOBar.less';
import {
	signOut,
	createUrlNode,
	createNode,
	searchNodes,
	showComponent,
	hideComponent,
} from '../../api/redux/actions';
// destructure antd components
const { Header } = Layout;
const { Option } = Select;

class PinHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: this.props.query.searchQuery || '',
			nodeTypes: this.props.query.type || 'all',
		};
	}

	toggleMainSider = async () => {
		if (this.props.mainSider) {
			this.props.hideComponent('mainSider');
		} else {
			this.props.showComponent('mainSider');
		}
	};

	// handle text input
	commandHandler = () => {
		return this.props.searchNodes({
			searchQuery: this.state.input,
			type: this.state.nodeTypes,
		});
	};

	// include an "all" option for queries
	renderSelectBefore = () => {
		return (
			<Select
				showSearch
				showArrow={false}
				value={this.state.nodeTypes}
				onChange={(value) => this.setState({ nodeTypes: value })}
			>
				<Option value='all'>all</Option>
				<Option value='url'>urls</Option>
				<Option value='text'>text</Option>
				<Option value='file'>file</Option>
				<Option value='image'>images</Option>
				<Option value='collection'>collections</Option>
			</Select>
		);
	};

	render() {
		return (
			<div>
				<Header className='page-header'>
					<ul
						className='nav-list'
						style={{ width: 'auto', justifyContent: 'left', marginLeft: '1.1rem' }}
					>
						<li className='nav-item io-sider-button mobile-visible' style={{ marginRight: '0' }}>
							<Button type='default' shape='circle' onClick={(e) => this.toggleMainSider()}>
								<Icon type={'bars'} theme='outlined' />
							</Button>
						</li>
						<li className='nav-item io-sider-button' style={{ marginRight: '0.5rem' }}>
							<Link type='default' to={`/graph`}>
								<Icon
									type={'deployment-unit'}
									theme='outlined'
									// style={{ color: '#ec486c' }}
								/>
							</Link>
						</li>
						<li className='nav-item io-sider-button'>
							<Link type='default' to={`/`}>
								<Icon
									type={'home'}
									theme='filled'
									// style={{ color: '#3ce458' }}
								/>
							</Link>
						</li>
						<li className='nav-item'>
							<p style={{ color: 'grey', paddingLeft: '0.7rem' }}>starboard</p>
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
	createUrlNode,
	showComponent,
	hideComponent,
})(PinHeader);
