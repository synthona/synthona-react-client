import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, message, Icon, Button, Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// custom code
import {
  fetchUserByUsername,
  updateUserInfo,
  updateUserAvatar,
  updateUserHeader,
  updateUsername,
  updateEmail,
  changePassword,
} from '../../redux/actions';
import './css/EditProfile.less';
// import IOBar from '../elements/IOBar';
import NodeList from '../elements/NodeList';
import HolsonaSider from '../elements/HolsonaSider';

const { Content } = Layout;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordModal: false,
      initialized: false,
      username: '',
      email: '',
      displayName: '',
      bio: '',
      avatar: '',
      header: '',
    };
  }

  componentDidMount() {
    document.title = `Edit Profile`;
    this.initializeFromUrlParams();
  }

  updatePassword = (values, { setSubmitting }) => {
    this.togglePasswordModal();
    setSubmitting(false);
    this.props.changePassword(values);
  };

  // show modal to confirm deletion
  togglePasswordModal = () => {
    if (this.state.showPasswordModal) {
      this.setState({ showPasswordModal: false });
    } else {
      this.setState({ showPasswordModal: true });
    }
  };

  passwordModal = () => {
    return (
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={this.updatePassword}
        style={{ display: 'inline-block' }}
      >
        {({ isSubmitting }) => (
          <Form className='password-modal-form'>
            <Field
              type='password'
              name='oldPassword'
              password
              placeholder='old password'
              className='password-modal-field'
            />
            <ErrorMessage name='oldPassword' component='div' />
            <Field
              type='password'
              name='newPassword'
              placeholder='new password'
              className='password-modal-field'
            />
            <ErrorMessage name='newPassword' component='div' />
            <Field
              type='password'
              name='confirmNewPassword'
              placeholder='confirm new password'
              className='password-modal-field'
            />
            <ErrorMessage name='confirmNewPassword' component='div' />
            <button type='submit' disabled={isSubmitting}>
              change password
            </button>
          </Form>
        )}
      </Formik>
    );
  };

  // load the text node and set the local id state.
  initializeFromUrlParams = async () => {
    // fetch the user info from the server
    const user = await this.props.fetchUserByUsername(this.props.user.username);
    if (user) {
      this.setState({
        initialized: true,
        username: user.username,
        email: this.props.user.email,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        header: user.header,
      });
    } else {
      message.error('there was a problem loading your profile');
      this.props.history.push('/');
    }
  };

  // select an image.
  setAvatar = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    // Listen for uploading local image, then save to server
    input.onchange = async () => {
      const file = input.files[0];
      // make sure file is an image
      if (/^image\//.test(file.type)) {
        // save the image to the server
        const url = await this.props.updateUserAvatar(file);
        this.setState({ avatar: url });
      } else {
        message.error('The file must be an image', 1);
      }
    };
  };

  setHeader = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    // Listen for uploading local image, then save to server
    input.onchange = async () => {
      const file = input.files[0];
      // make sure file is an image
      if (/^image\//.test(file.type)) {
        // save the image to the server
        const url = await this.props.updateUserHeader(file);
        this.setState({ header: url });
      } else {
        message.error('The file must be an image', 1);
      }
    };
  };

  // render display name
  renderDisplayName = () => {
    return (
      <input
        type='text'
        className='EditProfile-display-name'
        placeholder='Display Name'
        value={this.state.displayName}
        onChange={(e) => this.saveDisplayName(e.target.value)}
      ></input>
    );
  };

  // update and save the displayName
  saveDisplayName = (displayName) => {
    if (this.state.displayName !== displayName) {
      this.props.updateUserInfo({
        username: this.props.user.username,
        displayName: displayName,
      });
      document.title = displayName;
      this.setState({ displayName });
    }
  };

  // render the profile bio
  renderBio = () => {
    return (
      <textarea
        type='text'
        className='EditProfile-bio'
        placeholder='Bio'
        value={this.state.bio}
        onChange={(e) => this.saveBio(e.target.value)}
      ></textarea>
    );
  };

  // update and save the bio
  saveBio = (bio) => {
    if (this.state.bio !== bio) {
      this.props.updateUserInfo({
        username: this.props.user.username,
        bio: bio,
      });
      this.setState({ bio });
    }
  };

  // render the profile username
  renderUsername = () => {
    return (
      <input
        type='text'
        className='EditProfile-standard-input'
        placeholder='username'
        value={this.state.username}
        onChange={(e) => this.saveUsername(e.target.value)}
      ></input>
    );
  };

  // update and save the username
  saveUsername = (username) => {
    if (this.state.username !== username) {
      this.props.updateUsername(username);
      this.setState({ username });
    }
  };

  // render the profile email
  renderEmail = () => {
    return (
      <input
        type='text'
        className='EditProfile-standard-input'
        placeholder='email'
        value={this.state.email}
        onChange={(e) => this.saveEmail(e.target.value)}
      ></input>
    );
  };

  // update and save the email
  saveEmail = (email) => {
    if (this.state.email !== email) {
      this.props.updateEmail(email);
      this.setState({ email });
    }
  };

  componentWillUnmount() {
    // remove any selections on exit
    window.getSelection().removeAllRanges();
  }

  // should i be adding formik on here

  render() {
    return (
      <Layout className='page-layout'>
        <HolsonaSider />
        <Layout>
          <Content className='EditProfile'>
            <button onClick={this.setHeader}>
              <div className='EditProfile-header'>
                <Icon type='camera' className='EditProfile-header-edit-icon' />
                <img src={this.state.header} alt='example' draggable='false' />
              </div>
            </button>
            <button onClick={this.setAvatar}>
              <div className='EditProfile-avatar'>
                <Icon type='camera' className='EditProfile-avatar-edit-icon' />
                <img src={this.state.avatar} alt={'profile'} draggable='false' />
              </div>
            </button>
            <div className='EditProfile-info'>
              <Button
                type='default'
                style={{
                  margin: '0 0 10px',
                  backgroundColor: 'white',
                  width: 'auto',
                  padding: '0.5rem',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
                onClick={(e) => this.togglePasswordModal()}
              >
                change password
              </Button>
              <br />
              {this.renderDisplayName()}
              {this.renderUsername()}
              {this.renderEmail()}
              {this.renderBio()}
              <Button
                type='default'
                style={{
                  margin: '0 0 10px',
                  backgroundColor: 'white',
                  width: '4rem',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
                onClick={(e) => this.props.history.push(`/profile/${this.props.user.username}`)}
              >
                done
              </Button>
              <Modal
                title='change password'
                visible={this.state.showPasswordModal}
                className='password-modal'
                centered
                footer={null}
                closable={false}
                onCancel={this.togglePasswordModal}
              >
                {this.passwordModal()}
              </Modal>
            </div>
            <NodeList />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('old password is required'),
  newPassword: Yup.string()
    .min(5, 'Password has to be longer than 6 characters!')
    .required('password is required'),
  confirmNewPassword: Yup.string()
    .required('please confirm new password')
    .oneOf([Yup.ref('newPassword')], "Your passwords don't match"),
});

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, {
  fetchUserByUsername,
  updateUserInfo,
  updateUserAvatar,
  updateUserHeader,
  updateUsername,
  updateEmail,
  changePassword,
})(EditProfile);
