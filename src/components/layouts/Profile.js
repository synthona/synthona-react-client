import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, message, Modal } from 'antd';
// custom code
import Spinner from '../elements/Spinner';
import {
  fetchUserByUsername,
  showComponent,
  hideComponent,
  markNodeView,
} from '../../api/redux/actions';
import './css/Profile.less';
import NodeList from '../elements/node/NodeList';
import MainSider from '../elements/MainSider';
// import default images
import defaultHeader from '../../resources/cloud9.png';
import defaultAvatar from '../../resources/synthona-logo.png';

const { Content } = Layout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      username: '',
      displayName: '',
      bio: '',
      avatar: null,
      header: null,
      avatarModal: false,
    };
  }

  componentDidMount() {
    this.props.showComponent('mainSider');
    document.title = this.props.match.params.username;
    this.initializeFromUrlParams();
  }

  componentDidUpdate() {
    document.body.style.removeProperty('overflow');
    if (this.state.username !== this.props.match.params.username) {
      document.title = this.props.match.params.username;
      this.initializeFromUrlParams();
    }
  }

  componentWillUnmount() {
    this.props.hideComponent('mainSider');
  }

  toggleAvatarModal = () => {
    if (this.state.avatarModal === false) {
      this.setState({ avatarModal: true });
    } else {
      this.setState({ avatarModal: false });
    }
  };

  // load the text node and set the local id state.
  initializeFromUrlParams = async () => {
    // fetch the user info from the server
    const user = await this.props.fetchUserByUsername(this.props.match.params.username);
    if (user) {
      this.setState({
        initialized: true,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        header: user.header,
      });
      // mark the profile as viewed
      this.props.markNodeView({ uuid: user.nodeId });
      // set the page title
      document.title = user.displayName;
    } else {
      message.error('there was a problem loading the user');
      this.props.history.push('/');
    }
  };

  render() {
    if (!this.state.initialized) {
      return (
        <Layout className='page-layout'>
          <Layout>
            <Layout>
              <Spinner />
            </Layout>
          </Layout>
        </Layout>
      );
    }

    return (
      <div className='profile-container'>
        <MainSider showMask={false} animate={false} />
        <Layout>
          <Content style={{ marginBottom: '0' }} className='Profile'>
            <div className='profile-card'>
              <button href={`/profile/${this.state.username}`}>
                <div className='Profile-header'>
                  <img src={this.state.header || defaultHeader} alt='example' draggable='false' />
                </div>
              </button>
              {/* <button href={`/profile/${this.state.username}`}> */}
              <div className='Profile-avatar'>
                <img
                  src={this.state.avatar || defaultAvatar}
                  alt={'profile'}
                  draggable='false'
                  onClick={this.toggleAvatarModal}
                />
              </div>
              {/* </button> */}
              <div className='Profile-info'>
                <h2 className='Profile-displayName'>
                  {this.state.displayName}
                  <div className='verified-sign-container'>
                    <svg
                      viewBox='0 0 24 24'
                      aria-label='Verified account'
                      className='verified-sign'
                    >
                      <g>
                        <path d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'></path>
                      </g>
                    </svg>
                  </div>
                </h2>
                <i className='Profile-username'>{`@${this.state.username}`}</i>
                <p className='Profile-bio'>{this.state.bio}</p>
              </div>
            </div>
            <Modal
              title={this.state.displayName}
              visible={this.state.avatarModal}
              className='profile-modal'
              centered
              onCancel={this.toggleAvatarModal}
              closable={false}
              footer={null}
              afterClose={() => {
                // temporary fix to remove overflow property being set on body by antd
                document.body.style.removeProperty('overflow');
              }}
            >
              <img src={this.state.avatar || defaultAvatar} alt={'avatar'}></img>
            </Modal>
            <NodeList />
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, {
  fetchUserByUsername,
  showComponent,
  hideComponent,
  markNodeView,
})(Profile);
