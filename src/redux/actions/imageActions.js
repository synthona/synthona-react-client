import instance from '../../api/instance';
import history from '../../utils/history';
import {
  CREATE_IMAGE_NODE,
  CREATE_IMAGE_NODE_SUCCESS,
  CREATE_IMAGE_NODE_ERROR,
  FETCH_IMAGE_NODE,
  FETCH_IMAGE_NODE_SUCCESS,
  FETCH_IMAGE_NODE_ERROR
} from './types';
import { message } from 'antd';

export const createImageNode = (file, name) => async dispatch => {
  dispatch({ type: CREATE_IMAGE_NODE });
  try {
    // create image FormData
    const imageData = new FormData();
    imageData.append('image', file);
    if (name) {
      imageData.append('name', name);
    }
    // send the request
    const response = await instance.post('/image', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // if it's sucessful dispatch the success action
    if (response.status === 200) {
      dispatch({ type: CREATE_IMAGE_NODE_SUCCESS, payload: response.data.node });
      // return the image URL for immediate use
      return response.data.node.content;
    } else {
      message.error('There was a problem inserting the image', 1);
    }
  } catch (err) {
    dispatch({ type: CREATE_IMAGE_NODE_ERROR });
    message.error('There was a problem inserting the image', 1);
  }
};

// get image node handler
export const fetchImageNode = id => async dispatch => {
  dispatch({ type: FETCH_IMAGE_NODE });
  try {
    const response = await instance.get('/image', { params: { id } });
    dispatch({
      type: FETCH_IMAGE_NODE_SUCCESS,
      id: id,
      payload: response.data.node
    });
    return response.data.node;
  } catch (err) {
    dispatch({ type: FETCH_IMAGE_NODE_ERROR });
    message.error('Could not fetch item', 1);
    history.push('/');
  }
};
