import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, message, Modal } from 'antd';
// custom code
import Spinner from '../elements/Spinner';
import { fetchUserByUsername } from '../../redux/actions';
import './css/Profile.less';
import NodeList from '../elements/NodeList';
import HolsonaSider from '../elements/HolsonaSider';

const { Content } = Layout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      username: '',
      displayName: '',
      bio: '',
      avatar: '',
      header: '',
      showAvatarModal: null,
    };
  }

  componentDidMount() {
    document.title = this.props.match.params.username;
    this.initializeFromUrlParams();
  }

  componentDidUpdate() {
    if (this.state.username !== this.props.match.params.username) {
      document.title = this.props.match.params.username;
      this.initializeFromUrlParams();
    }
  }

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
      document.title = user.displayName;
    } else {
      message.error('there was a problem loading the user');
      this.props.history.push('/');
    }
  };

  // show modal to confirm deletion
  toggleAvatarModal = () => {
    if (this.state.showAvatarModal) {
      this.setState({ showAvatarModal: false });
    } else {
      this.setState({ showAvatarModal: true });
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
      <Layout className='page-layout'>
        <HolsonaSider />
        <Layout>
          <Modal
            title={this.state.displayName}
            visible={this.state.showAvatarModal}
            centered
            style={{ textAlign: 'center' }}
            closable={false}
            maskClosable
            width={'auto'}
            footer={null}
            onCancel={this.toggleAvatarModal}
          >
            <img
              src={this.state.avatar}
              alt={'profile'}
              draggable='false'
              style={{ maxHeight: '50vh' }}
            />
          </Modal>
          <Content style={{ marginBottom: '0' }} className='Profile'>
            <div className='profile-card'>
              <button href={`/profile/${this.state.username}`}>
                <div className='Profile-header'>
                  <img src={this.state.header} alt='example' draggable='false' />
                </div>
              </button>
              {/* <button href={`/profile/${this.state.username}`}> */}
              <div className='Profile-avatar'>
                <img
                  src={this.state.avatar}
                  alt={'profile'}
                  draggable='false'
                  onClick={this.toggleAvatarModal}
                />
              </div>
              {/* </button> */}
              <div className='Profile-info'>
                <h2 className='Profile-displayName'>{this.state.displayName}</h2>
                <i className='Profile-username'>{`@${this.state.username}`}</i>
                <p className='Profile-bio'>{this.state.bio}</p>
              </div>
            </div>
            <NodeList />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { fetchUserByUsername })(Profile);
