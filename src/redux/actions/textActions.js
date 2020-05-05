import instance from '../../api/instance';
import history from '../../utils/history';
import {
  CREATE_TEXT_NODE,
  CREATE_TEXT_NODE_SUCCESS,
  CREATE_TEXT_NODE_ERROR,
  FETCH_TEXT_NODE,
  FETCH_TEXT_NODE_SUCCESS,
  FETCH_TEXT_NODE_ERROR,
  DELETE_TEXT_NODE,
  DELETE_TEXT_NODE_SUCCESS,
  DELETE_TEXT_NODE_ERROR,
  EDIT_TEXT_NODE,
  EDIT_TEXT_NODE_SUCCESS,
  EDIT_TEXT_NODE_ERROR,
  PROCESS_TEXT_NODE,
  PROCESS_TEXT_NODE_SUCCESS,
  PROCESS_TEXT_NODE_ERROR,
} from './types';
import { message } from 'antd';
import Delta from 'quill-delta';

// Create text node handler
export const createTextNode = (name) => async (dispatch) => {
  dispatch({ type: CREATE_TEXT_NODE });
  try {
    const delta = new Delta();
    const content = JSON.stringify(delta);
    const response = await instance.post('/text', { content, name });
    dispatch({ type: CREATE_TEXT_NODE_SUCCESS, payload: response.data });
    // if successfully created, redirect the user to the edit node page
    history.push('/edit/text/' + response.data.uuid);
  } catch (err) {
    dispatch({ type: CREATE_TEXT_NODE_ERROR });
    message.error('Could not create new item', 1);
    history.push('/');
  }
};

// get text node handler
export const fetchTextNode = (uuid) => async (dispatch) => {
  dispatch({ type: FETCH_TEXT_NODE });
  try {
    const response = await instance.get('/text', { params: { uuid } });
    dispatch({
      type: FETCH_TEXT_NODE_SUCCESS,
      uuid: uuid,
      payload: response.data.textNode,
    });
  } catch (err) {
    dispatch({ type: FETCH_TEXT_NODE_ERROR });
    message.error('Could not fetch item', 1);
    history.push('/');
  }
};

// delete text node handler
export const deleteTextNode = (uuid) => async (dispatch) => {
  dispatch({ type: DELETE_TEXT_NODE });
  try {
    await instance.delete(`/text`, { params: { uuid } });
    dispatch({ type: DELETE_TEXT_NODE_SUCCESS, uuid: uuid });
    message.success('The note was deleted', 1);
  } catch (err) {
    dispatch({ type: DELETE_TEXT_NODE_ERROR });
    message.error('There was a problem deleting the note', 1);
  }
};

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
      uuid: node.uuid,
      content: node.content,
    });
  } catch (err) {
    dispatch({ type: EDIT_TEXT_NODE_ERROR });
    message.error('There was a problem saving your changes', 1);
    history.push('/');
  }
};

// final processing of text node after closing the editor
export const processTextNode = (uuid, summary) => async (dispatch) => {
  dispatch({ type: PROCESS_TEXT_NODE });
  try {
    await instance.patch('/text/process', { uuid, summary });
    dispatch({ type: PROCESS_TEXT_NODE_SUCCESS, uuid, summary });
  } catch (err) {
    dispatch({ type: PROCESS_TEXT_NODE_ERROR });
  }
};
