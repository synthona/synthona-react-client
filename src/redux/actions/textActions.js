import instance from '../../api/instance';
import history from '../../utils/history';
import {
  // CREATE_TEXT_NODE,
  // CREATE_TEXT_NODE_SUCCESS,
  // CREATE_TEXT_NODE_ERROR,
  EDIT_TEXT_NODE,
  EDIT_TEXT_NODE_SUCCESS,
  EDIT_TEXT_NODE_ERROR,
  PROCESS_TEXT_NODE,
  PROCESS_TEXT_NODE_SUCCESS,
  PROCESS_TEXT_NODE_ERROR,
} from './types';
import { message } from 'antd';
// import Delta from 'quill-delta';

// Create text node handler
// export const createTextNode = (name) => async (dispatch) => {
//   dispatch({ type: CREATE_TEXT_NODE });
//   try {
//     const delta = new Delta();
//     const content = JSON.stringify(delta);
//     const response = await instance.post('/text', { content, name });
//     dispatch({ type: CREATE_TEXT_NODE_SUCCESS, payload: response.data });
//     // if successfully created, redirect the user to the edit node page
//     history.push('/edit/text/' + response.data.uuid);
//   } catch (err) {
//     dispatch({ type: CREATE_TEXT_NODE_ERROR });
//     message.error('Could not create new item', 1);
//     history.push('/');
//   }
// };

// edit text node handler
export const editTextNode = (node) => async (dispatch) => {
  dispatch({ type: EDIT_TEXT_NODE });
  try {
    await instance.patch('/text', {
      uuid: node.uuid,
      content: node.content,
    });
    dispatch({
      type: EDIT_TEXT_NODE_SUCCESS,
      node: node,
    });
  } catch (err) {
    dispatch({ type: EDIT_TEXT_NODE_ERROR });
    message.error('There was a problem saving your changes', 1);
    history.push('/');
  }
};

// final processing of text node after closing the editor
export const processTextNode = (node) => async (dispatch) => {
  dispatch({ type: PROCESS_TEXT_NODE });
  try {
    await instance.patch('/text/process', { uuid: node.uuid, summary: node.summary });
    dispatch({ type: PROCESS_TEXT_NODE_SUCCESS, node, summary: node.summary });
  } catch (err) {
    dispatch({ type: PROCESS_TEXT_NODE_ERROR });
  }
};
