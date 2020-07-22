import instance from '../../../api/instance';
// import history from '../history';
import {
  FETCH_USER_NODE,
  UPDATE_USER_NODE,
  UPDATE_USER_NODE_ERROR,
  UPDATE_USER_NODE_SUCCESS,
  UPDATE_USER_AVATAR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
  UPDATE_USER_HEADER,
  UPDATE_USER_HEADER_SUCCESS,
  UPDATE_USER_HEADER_ERROR,
} from './types';
import { message } from 'antd';

// get user by username handler
export const fetchUserByUsername = (username) => async (dispatch) => {
  dispatch({ type: FETCH_USER_NODE });
  try {
    const response = await instance.get('/user/username', { params: { username } });
    const user = response.data.user;
    return user;
    // TODO: once i add users a node type on the homepage, is when i should be adding this reducer
    // dispatch({ type: FETCH_TEXT_NODE_SUCCESS, payload: response.data });
  } catch (err) {
    // dispatch({ type: FETCH_TEXT_NODE_ERROR });
    message.error('Could not fetch user', 1);
    // history.push('/');
  }
};

// get user by username handler
// export const fetchUserByEmail = email => async dispatch => {
//   dispatch({ type: FETCH_USER_NODE });
//   try {
//     const response = await instance.get('/user/username', { params: { email } });
//     const user = response.data.user;
//     return user;
//     // TODO: once i add users a node type on the homepage, is when i should be adding this reducer
//     // dispatch({ type: FETCH_TEXT_NODE_SUCCESS, payload: response.data });
//   } catch (err) {
//     // dispatch({ type: FETCH_TEXT_NODE_ERROR });
//     message.error('Could not fetch user', 1);
//     // history.push('/');
//   }
// };

// update user by username
export const updateUserInfo = (user) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_NODE });
  try {
    const response = await instance.patch('/user/info', {
      username: user.username,
      bio: user.bio,
      displayName: user.displayName,
    });
    const updatedUser = response.data.user;
    dispatch({ type: UPDATE_USER_NODE_SUCCESS, user: updatedUser });
    return updatedUser;
  } catch (err) {
    dispatch({ type: UPDATE_USER_NODE_ERROR });
    message.error('Could not update user', 1);
  }
};

// update username
export const updateUsername = (username) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_NODE });
  try {
    const response = await instance.patch('/user/username', {
      username: username,
    });
    const updatedUser = response.data.user;
    dispatch({ type: UPDATE_USER_NODE_SUCCESS, user: updatedUser });
    return updatedUser;
  } catch (err) {
    dispatch({ type: UPDATE_USER_NODE_ERROR });
    message.error('Could not update user', 1);
  }
};

// update user by username
export const updateEmail = (email) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_NODE });
  try {
    const response = await instance.patch('/user/email', {
      email: email,
    });
    const updatedUser = response.data.user;
    dispatch({ type: UPDATE_USER_NODE_SUCCESS, user: updatedUser });
    return updatedUser;
  } catch (err) {
    dispatch({ type: UPDATE_USER_NODE_ERROR });
    message.error('Could not update user', 1);
  }
};

// update user avatar
export const updateUserAvatar = (file) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_AVATAR });
  try {
    // create image FormData
    const imageData = new FormData();
    imageData.append('image', file);
    // send the request
    const response = await instance.patch('/user/avatar', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // if it's sucessful dispatch the success action
    if (response.status === 200) {
      dispatch({ type: UPDATE_USER_AVATAR_SUCCESS, url: response.data.url });
      // return the image URL for immediate use
      return response.data.url;
    } else {
      message.error('There was a problem uploading the image', 1);
    }
  } catch (err) {
    dispatch({ type: UPDATE_USER_AVATAR_ERROR });
    message.error('There was a problem uploading the image', 1);
  }
};

export const updateUserHeader = (file) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_HEADER });
  try {
    // create image FormData
    const imageData = new FormData();
    imageData.append('image', file);
    // send the request
    const response = await instance.patch('/user/header', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // if it's sucessful dispatch the success action
    if (response.status === 200) {
      dispatch({ type: UPDATE_USER_HEADER_SUCCESS, url: response.data.url });
      // return the image URL for immediate use
      return response.data.url;
    } else {
      message.error('There was a problem uploading the image', 1);
    }
  } catch (err) {
    dispatch({ type: UPDATE_USER_HEADER_ERROR });
    message.error('There was a problem uploading the image', 1);
  }
};
