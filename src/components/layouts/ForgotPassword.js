import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Layout, Card } from 'antd';
// custom code
import { forgotPassword } from '../../api/redux/actions';
import './css/Login.less';

// destructure antd
const { Content, Footer } = Layout;

class ForgotPassword extends Component {
  componentDidMount() {
    document.title = 'forgot password';
  }

  onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.forgotPassword(values);
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
                    {' '}
                    <span
                      role='img'
                      aria-label='jsx-a11y/accessible-emoji'
                      style={{ paddingRight: '0.5rem' }}
                    >
                      {' '}
                      ✨
                    </span>
                    lost password{' '}
                    <span
                      role='img'
                      aria-label='jsx-a11y/accessible-emoji'
                      style={{ paddingRight: '0.5rem' }}
                    >
                      {' '}
                      ✨
                    </span>
                  </h1>
                  <Field type='email' name='email' placeholder='email' className='login-field' />
                  <ErrorMessage name='email' component='div' className='login-error' />
                  <Field
                    type='password'
                    name='newPassword'
                    placeholder='new password'
                    className='login-field'
                  />
                  <ErrorMessage name='newPassword' component='div' className='login-error' />
                  <Field
                    type='password'
                    name='confirmNewPassword'
                    placeholder='confirm new password'
                    className='login-field'
                  />
                  <ErrorMessage name='confirmNewPassword' component='div' className='login-error' />
                  <button type='submit' disabled={isSubmitting} className='login-submit'>
                    reset
                  </button>
                  <Link to='/' className='login-signup'>
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
  email: Yup.string().required().email('E-mail is not valid!'),
  newPassword: Yup.string().required('new password is required'),
  confirmNewPassword: Yup.string()
    .required('please confirm new password')
    .oneOf([Yup.ref('newPassword')], "Your passwords don't match"),
});

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
