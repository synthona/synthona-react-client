import instance from '../../../api/instance';
import history from '../../../utils/history';
import {
  EDIT_TEXT_NODE,
  EDIT_TEXT_NODE_SUCCESS,
  EDIT_TEXT_NODE_ERROR,
  PROCESS_TEXT_NODE,
  PROCESS_TEXT_NODE_SUCCESS,
  PROCESS_TEXT_NODE_ERROR,
} from './types';
import { message } from 'antd';

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
    await instance.patch('/text/process', { uuid: node.uuid, preview: node.preview });
    dispatch({ type: PROCESS_TEXT_NODE_SUCCESS, node, preview: node.preview });
  } catch (err) {
    dispatch({ type: PROCESS_TEXT_NODE_ERROR });
  }
};
