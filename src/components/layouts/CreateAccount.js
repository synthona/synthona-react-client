import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Layout, Card } from 'antd';
// custom code
import { createAccount } from '../../api/redux/actions';
import './css/Login.less';

// destructure antd
const { Content, Footer } = Layout;

class CreateAccount extends Component {
  componentDidMount() {
    document.title = 'Create Account';
  }

  onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.createAccount(values);
  };

  render() {
    return (
      <Layout className='login-layout'>
        <Content className='login-content'>
          <Card className='login-card'>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className='login-form'>
                  <h1 className='login-title'>
                    <span
                      role='img'
                      aria-label='jsx-a11y/accessible-emoji'
                      style={{ paddingRight: '0.5rem' }}
                    >
                      ✨
                    </span>
                    create user
                    <span
                      role='img'
                      aria-label='jsx-a11y/accessible-emoji'
                      style={{ paddingLeft: '0.5rem' }}
                    >
                      ✨
                    </span>
                  </h1>
                  <Field type='email' name='email' placeholder='email' className='login-field' />
                  <ErrorMessage name='email' component='div' />
                  <Field
                    type='username'
                    name='username'
                    placeholder='username'
                    className='login-field'
                  />
                  <ErrorMessage name='username' component='div' />
                  <Field
                    type='password'
                    name='password'
                    placeholder='password'
                    className='login-field'
                  />
                  <ErrorMessage name='password' component='div' />
                  <Field
                    type='password'
                    name='confirmPassword'
                    placeholder='confirm password'
                    className='login-field'
                  />
                  <ErrorMessage name='confirmPassword' component='div' />
                  <button type='submit' disabled={isSubmitting} className='login-submit'>
                    create account
                  </button>
                  <Link to='/' style={{ textAlign: 'center' }} className='login-signup'>
                    back to login
                  </Link>
                </Form>
              )}
            </Formik>
          </Card>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail is not valid!').required('email is required'),
  username: Yup.string().required('username is required'),
  password: Yup.string()
    .min(5, 'Password has to be longer than 6 characters!')
    .required('password is required'),
  confirmPassword: Yup.string()
    .required('please confirm password')
    .oneOf([Yup.ref('password')], "Your passwords don't match"),
});

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createAccount })(CreateAccount);
