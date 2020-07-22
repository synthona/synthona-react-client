import instance from '../../instance';
import { CREATE_FILE_NODE, CREATE_FILE_NODE_SUCCESS, CREATE_FILE_NODE_ERROR } from './types';
import { message } from 'antd';

export const createFileNode = (file, name, linkedNode) => async (dispatch) => {
  dispatch({ type: CREATE_FILE_NODE });
  try {
    // create image FormData
    const fileData = new FormData();
    fileData.append('image', file);
    if (name) {
      fileData.append('name', name);
    }
    if (linkedNode) {
      fileData.append('linkedNode', linkedNode);
    }
    // send the request
    const response = await instance.put('/file', fileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // if it's sucessful dispatch the success action
    if (response.status === 200) {
      dispatch({ type: CREATE_FILE_NODE_SUCCESS, payload: response.data.node });
      // return the image URL for immediate use
      return response.data.node.preview;
    } else {
      message.error('There was a problem inserting the file', 1);
    }
  } catch (err) {
    dispatch({ type: CREATE_FILE_NODE_ERROR });
    message.error('There was a problem inserting the file', 1);
  }
};
