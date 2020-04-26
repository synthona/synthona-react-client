import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Avatar, Modal } from 'antd';
import { signOut, createTextNode } from '../../redux/actions';
// custom code
import './InsonaSider.less';
// destructure antd components
// const { SubMenu } = Menu;
const { Sider } = Layout;
// const { Search } = Input;
const { Item } = Menu;
// const { Option } = Select;

class InsonaSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignoutModal: null,
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  signOutHandler = () => {
    this.props.signOut();
  };

  // show modal to confirm deletion
  toggleSignoutModal = () => {
    if (this.state.showSignoutModal) {
      this.setState({ showSignoutModal: false });
    } else {
      this.setState({ showSignoutModal: true });
    }
  };

  render() {
    return (
      <div className='sider-container'>
        <Sider className='page-sider'>
          {/* <Button type='primary' onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          className='page-sider'
          placement='left'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        > */}
          <Menu mode='vertical' defaultSelectedKeys={['1']} className='sider-menu'>
            <Item>
              <Link to={`/`}>
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
                {/* <h3
                  style={{
                    display: 'inline-block',
                    fontSize: '1.1rem',
                    padding: '0 0 0 0.6rem',
                    verticalAlign: 'middle',
                    margin: 0
                  }}
                >
                  {this.props.user.displayName}
                </h3> */}
              </Link>
            </Item>
            <Item className='sider-menu-item sider-title'>
              <Link to={`/profile/${this.props.user.username}`}>
                <b>{this.props.user.displayName}</b>
                {/* <b>Profile</b> */}
              </Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to={`/`}>Explore</Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/'>Nodes</Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/'>Collections</Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/'>Map</Link>
            </Item>
            <Item className='sider-menu-item'>
              <Link to='/'>Chat</Link>
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
          {/* </Drawer> */}
        </Sider>
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
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { signOut, createTextNode })(InsonaSider);
