import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Avatar, Modal, Drawer, Icon } from 'antd';
import {
	signOut,
	hideComponent,
	generateInstanceExport,
	clearActiveNode,
} from '../../api/redux/actions';
// images
import defaultAvatar from '../../resources/synthona-logo.png';
// custom code
import './css/MainSider.less';
import Spinner from './Spinner';
// destructure antd components
const { Item } = Menu;

class MainSider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSignoutModal: null,
			visible: false,
		};
	}

	signOutHandler = () => {
		this.props.signOut();
	};

	// show modal to confirm deletion
	toggleSignoutModal = () => {
		if (this.state.showSignoutModal) {
			this.setState({ showSignoutModal: false });
			// temporary fix to remove overflow property being set on body by antd
			document.body.style.removeProperty('overflow');
		} else {
			this.setState({ showSignoutModal: true });
		}
	};

	renderDrawerClasses = () => {
		if (this.props.animate === false) {
			return 'page-sider no-animation';
		} else {
			return 'page-sider';
		}
	};

	render() {
		if (this.props.mainSider === null) {
			return <Spinner></Spinner>;
		}

		return (
			<div className='sider-container'>
				<Drawer
					className={this.renderDrawerClasses()}
					width='200px'
					mask={this.props.showMask}
					placement='left'
					closable={false}
					onClose={(e) => this.props.hideComponent('mainSider')}
					visible={this.props.mainSider ? this.props.mainSider.visible : false}
				>
					<Menu mode='vertical' defaultSelectedKeys={['1']} className='sider-menu'>
						<Item>
							<Link
								to={`/profile/${this.props.user.username}`}
								onClick={(e) => this.props.hideComponent('mainSider')}
							>
								<Avatar
									className='nav-avatar'
									src={this.props.user.avatar || defaultAvatar}
									icon='user'
									style={{
										display: 'inline-block',
										verticalAlign: 'middle',
										marginTop: '0.8rem',
										width: '2.5rem',
										height: '2.5rem',
										// border: '0.1rem solid #272727',
										objectFit: 'contain',
									}}
								/>
							</Link>
						</Item>
						<Item className='sider-menu-item sider-title'>
							<Link
								to={`/profile/${this.props.user.username}`}
								onClick={(e) => this.props.hideComponent('mainSider')}
							>
								{/*  <b>@{this.props.user.username}</b>*/}
								<Icon type={'sketch'} theme='outlined' style={{ margin: '0' }} /> <b>Profile</b>
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link to={`/`} onClick={(e) => this.props.hideComponent('mainSider')}>
								Explore
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link to={`/pins`} onClick={(e) => this.props.hideComponent('mainSider')}>
								Favorites
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link
								to={`/graph`}
								onClick={(e) => {
									this.props.clearActiveNode();
									this.props.hideComponent('mainSider');
								}}
							>
								Constellation
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link to={`/random`} onClick={(e) => this.props.hideComponent('mainSider')}>
								Random
							</Link>
						</Item>
						{/*<Item className='sider-menu-item'>
              <Link to='/' onClick={(e) => this.props.hideComponent('mainSider')}>
                Nodes
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/' onClick={(e) => this.props.hideComponent('mainSider')}>
                Map
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/' onClick={(e) => this.props.hideComponent('mainSider')}>
                Chat
              </Link>
                </Item>  */}
						<Item className='sider-menu-item'>
							<Link to={`/edit/profile/`} onClick={(e) => this.props.hideComponent('mainSider')}>
								Options
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link
								to='/help'
								onClick={(e) => {
									e.preventDefault();
									window.open(
										'https://github.com/synthona/synthona-help/blob/main/README.md',
										'_blank'
									);
									this.props.hideComponent('mainSider');
								}}
							>
								Help
							</Link>
						</Item>
						<Item className='sider-menu-item'>
							<Link to='#' onClick={this.toggleSignoutModal}>
								Sign Out
							</Link>
						</Item>
					</Menu>
				</Drawer>
				{/* </Sider> */}
				<Modal
					title={this.props.user.displayName}
					visible={this.state.showSignoutModal}
					className='signout-modal'
					centered
					onOk={this.signOutHandler}
					okType='primary'
					okText='Sign Out'
					closable={false}
					onCancel={this.toggleSignoutModal}
				>
					<p>Are you sure you want to sign out?</p>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { user: state.auth.user, mainSider: state.components.componentList['mainSider'] };
};

export default connect(mapStateToProps, {
	signOut,
	hideComponent,
	generateInstanceExport,
	clearActiveNode,
})(MainSider);
