import instance from '../../api/instance';
import history from '../../utils/history';
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
    const response = await instance.post('/auth/signup', formValues);
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
    const response = await instance.post('/auth/login', formValues);
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

// ====================================================================================
// I'm...not sure if this is needed or if it is, it shouldn't be called on every
// single page refresh. it can be called every five minutes or something via a service?
// but, it should also be called when you first load the app...
// have to give this more thought
// ====================================================================================
// Refresh Auth Action Handler
export const refreshAuth = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_AUTH });
    const response = await instance.get('/auth/refresh');
    dispatch({ type: REFRESH_AUTH_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: REFRESH_AUTH_ERROR });
    // send page redirect for the user
    history.push('/');
  }
};
