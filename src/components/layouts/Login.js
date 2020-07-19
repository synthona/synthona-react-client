import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Layout, Card } from 'antd';
// custom code
import { signIn } from '../../redux/actions';
import './css/Login.less';

// destructure antd
const { Content, Footer } = Layout;

class Login extends Component {
  componentDidMount() {
    document.title = 'synthona';
  }

  getUsername = () => {
    const username = localStorage.getItem('displayName');
    if (username) {
      return username;
    } else {
      return 'synthona';
    }
    // return 'synthona';
  };

  onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.signIn(values);
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
                    <span role='img' aria-label='jsx-a11y/accessible-emoji'>
                      ✨
                    </span>
                    {' ' + this.getUsername() + ' '}
                    <span role='img' aria-label='jsx-a11y/accessible-emoji'>
                      ✨
                    </span>
                  </h1>
                  <Field type='email' name='email' placeholder='email' className='login-field' />
                  <ErrorMessage name='email' component='div' className='login-error' />
                  <Field
                    type='password'
                    name='password'
                    placeholder='password'
                    className='login-field'
                  />
                  <ErrorMessage name='password' component='div' className='login-error' />
                  <ErrorMessage name='confirmPassword' component='div' className='login-error' />
                  <button type='submit' disabled={isSubmitting} className='login-submit'>
                    login
                  </button>
                  <Link to='/signup' className='login-signup'>
                    create user
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
  password: Yup.string().required().min(5, 'Password has to be longer than 6 characters!'),
});

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn })(Login);
