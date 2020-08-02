import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, message } from 'antd';
// custom code
import Spinner from '../elements/Spinner';
import { fetchUserByUsername, showComponent, hideComponent } from '../../api/redux/actions';
import './css/Profile.less';
import NodeList from '../elements/node/NodeList';
import MainSider from '../elements/MainSider';
// import default images
import defaultHeader from '../../resources/synthona-login.png';
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
      avatar: '',
      header: '',
    };
  }

  componentDidMount() {
    this.props.showComponent('mainSider');
    document.title = this.props.match.params.username;
    this.initializeFromUrlParams();
  }

  componentDidUpdate() {
    if (this.state.username !== this.props.match.params.username) {
      document.title = this.props.match.params.username;
      this.initializeFromUrlParams();
    }
  }

  componentWillUnmount() {
    this.props.hideComponent('mainSider');
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
                <h2 className='Profile-displayName'>{this.state.displayName}</h2>
                <i className='Profile-username'>{`@${this.state.username}`}</i>
                <p className='Profile-bio'>{this.state.bio}</p>
              </div>
            </div>
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

export default connect(mapStateToProps, { fetchUserByUsername, showComponent, hideComponent })(
  Profile
);
