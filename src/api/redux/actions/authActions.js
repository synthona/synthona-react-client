import instance from '../../../api/instance';
import history from '../../../utils/history';
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  REFRESH_AUTH,
  REFRESH_AUTH_SUCCESS,
  REFRESH_AUTH_ERROR,
  RESET_APP,
} from './types';
import { message } from 'antd';

// Create Account Action handler
export const createAccount = (formValues) => async (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT });
  try {
    const response = await instance.put('/auth/signup', formValues);
    localStorage.setItem('displayName', response.data.displayName);
    dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response.data });
    history.push('/');
  } catch (err) {
    dispatch({ type: CREATE_ACCOUNT_ERROR });
    message.error('There was a problem creating the account', 1);
    history.push('/');
  }
};

// Sign In Action handler
export const signIn = (formValues) => async (dispatch) => {
  dispatch({ type: SIGN_IN });
  try {
    const response = await instance.put('/auth/login', formValues);
    localStorage.setItem('displayName', response.data.displayName);
    dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: SIGN_IN_ERROR });
    message.error('There was a problem signing in', 1);
    history.push('/');
  }
};

// Sign Out Action Handler
export const signOut = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT });
  try {
    await instance.get('/auth/signout');
    dispatch({ type: RESET_APP });
    message.success('Signed Out', 1);
    // send page redirect for the user
    history.push('/');
  } catch (err) {
    dispatch({ type: SIGN_OUT_ERROR });
    message.error('There was a problem signing out', 1);
  }
};

export const changePassword = (formValues) => async (dispatch) => {
  try {
    const response = await instance.patch('/auth/password', {
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
    });
    if (response.status === 200) {
      message.success('changed password', 1);
    }
  } catch (err) {
    message.error('Could not update password', 1);
  }
};

export const forgotPassword = (formValues) => async (dispatch) => {
  try {
    const response = await instance.put('/auth/forgot-password', {
      email: formValues.email,
      newPassword: formValues.newPassword,
      confirmNewPassword: formValues.confirmNewPassword,
    });
    if (response.status === 200) {
      window.location.replace('/');
    }
  } catch (err) {
    message.error('something went wrong', 1);
  }
};

export const isAuthenticated = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_AUTH });
    const response = await instance.get('/auth');
    dispatch({ type: REFRESH_AUTH_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: REFRESH_AUTH_ERROR });
  }
};
