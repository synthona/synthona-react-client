import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Avatar, Modal, Drawer } from 'antd';
import { signOut, hideComponent, generateInstanceExport } from '../../redux/actions';
// custom code
import './MainSider.less';
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
    return (
      <div className='sider-container'>
        <Drawer
          className={this.renderDrawerClasses()}
          width='200px'
          mask={this.props.showMask}
          placement='left'
          closable={false}
          onClose={(e) => this.props.hideComponent('mainSider')}
          visible={this.props.mainSider}
        >
          <Menu mode='vertical' defaultSelectedKeys={['1']} className='sider-menu'>
            <Item>
              <Link to={`/profile/${this.props.user.username}`}>
                <Avatar
                  className='nav-avatar'
                  src={this.props.user.avatar}
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
              <Link to={`/profile/${this.props.user.username}`}>
                <b>{this.props.user.displayName}</b>
                {/* <b>Profile</b> */}
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to={`/`} onClick={(e) => this.props.hideComponent('mainSider')}>
                Home
              </Link>
            </Item>
            <Item className='sider-menu-item'>
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
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/' onClick={(e) => this.props.hideComponent('mainSider')}>
                Help
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link
                to='/'
                onClick={(e) => {
                  this.props.hideComponent('mainSider');
                  this.props.generateInstanceExport();
                }}
              >
                Export
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              {/* HARD-CODED URL FOR VIEWING A SAMPLE EXPORT */}
              <a href={`http://localhost:9000/port/${this.props.user.username}.synth.zip`}>
                View Export
              </a>
            </Item>
            <Item className='sider-menu-item'>
              <Link to={`/edit/profile/`}>Settings</Link>
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

export default connect(mapStateToProps, { signOut, hideComponent, generateInstanceExport })(
  MainSider
);
