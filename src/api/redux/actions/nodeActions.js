import instance from '../../../api/instance';
import history from '../../../utils/history';
import {
	FETCH_NODES,
	FETCH_NODES_ERROR,
	FETCH_NODES_SUCCESS,
	UPDATE_NODE,
	UPDATE_NODE_SUCCESS,
	UPDATE_NODE_ERROR,
	UPDATE_ACTIVE_NODE,
	UPDATE_ACTIVE_NODE_ERROR,
	UPDATE_ACTIVE_NODE_SUCCESS,
	SEARCH_NODES,
	SEARCH_NODES_ERROR,
	SEARCH_NODES_SUCCESS,
	RESET_APP,
	CREATE_NODE,
	CREATE_NODE_SUCCESS,
	CREATE_NODE_ERROR,
	MARK_NODE_VIEW,
	MARK_NODE_VIEW_ERROR,
	MARK_NODE_VIEW_SUCCESS,
	SET_ACTIVE_NODE,
	SET_ACTIVE_NODE_SUCCESS,
	SET_ACTIVE_NODE_ERROR,
	DELETE_NODE,
	DELETE_NODE_ERROR,
	DELETE_NODE_SUCCESS,
	CLEAR_ACTIVE_NODE,
} from './types';
import { message } from 'antd';
import Delta from 'quill-delta';

// fetch a list of nodes
export const fetchNodes = (query) => async (dispatch) => {
	try {
		dispatch({ type: FETCH_NODES });
		const response = await instance.get('/node/search', {
			params: {
				page: query.page,
				type: query.type,
				searchQuery: query.searchQuery,
				pinned: query.pinned,
				sortType: query.sortType,
				sortOrder: query.sortOrder,
			},
		});
		dispatch({ type: FETCH_NODES_SUCCESS, payload: response.data, query });
	} catch (err) {
		dispatch({ type: FETCH_NODES_ERROR });
		dispatch({ type: RESET_APP });
		// message.error('Could not fetch items', 1);
		history.push('/');
	}
};

// search the database
export const searchNodes = (query) => async (dispatch) => {
	if (query.type === 'all') {
		query.type = null;
	}
	try {
		dispatch({ type: SEARCH_NODES });
		const response = await instance.get('/node/search', {
			params: {
				page: query.page,
				type: query.type,
				searchQuery: query.searchQuery,
				pinned: query.pinned,
				sortType: query.sortType,
				sortOrder: query.sortOrder,
			},
		});
		dispatch({ type: SEARCH_NODES_SUCCESS, payload: response.data, query });
		history.push('/');
	} catch (err) {
		dispatch({ type: SEARCH_NODES_ERROR });
		dispatch({ type: RESET_APP });
		message.error('Could not search nodes', 1);
		history.push('/');
	}
};

// update node handler
export const updateNode = (node) => async (dispatch) => {
	dispatch({ type: UPDATE_NODE });
	try {
		const result = await instance.patch('/node', {
			uuid: node.uuid,
			hidden: node.hidden,
			searchable: node.searchable,
			name: node.name,
			preview: node.preview,
			path: node.path,
		});
		dispatch({
			type: UPDATE_NODE_SUCCESS,
			uuid: node.uuid,
			result: result.data.node,
		});
		// if the node has been hidden remove it from the nodelist
		if (node.hidden === true) {
			dispatch({ type: DELETE_NODE_SUCCESS, uuid: node.uuid });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: UPDATE_NODE_ERROR });
		message.error('There was a problem saving your changes', 1);
		history.push('/');
	}
};

// update node handler
export const clearNodePreview = (node) => async (dispatch) => {
	dispatch({ type: UPDATE_ACTIVE_NODE });
	try {
		await instance.patch('/node/preview/clear', {
			uuid: node.uuid,
		});
		window.location.reload();
	} catch (err) {
		console.log(err);
		message.error('There was a problem saving your changes', 1);
		history.push('/');
	}
};

// special handler for updating the active node
export const updateActiveNode = (node) => async (dispatch) => {
	dispatch({ type: UPDATE_ACTIVE_NODE });
	try {
		const result = await instance.patch('/node', {
			uuid: node.uuid,
			hidden: node.hidden,
			searchable: node.searchable,
			name: node.name,
			preview: node.preview,
			pinned: node.pinned,
		});
		dispatch({
			type: UPDATE_ACTIVE_NODE_SUCCESS,
			uuid: node.uuid,
			result: result.data.node,
		});
		// if the node has been hidden remove it from the nodelist
		if (node.hidden === true) {
			dispatch({ type: DELETE_NODE_SUCCESS, uuid: node.uuid });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: UPDATE_ACTIVE_NODE_ERROR });
		message.error('There was a problem saving your changes', 1);
		history.push('/');
	}
};

export const createNode = (node, file) => async (dispatch) => {
	dispatch({ type: CREATE_NODE });
	// set content to empty quill delta for text node
	if (node.type === 'text') {
		const delta = new Delta();
		delta.insert(node.name);
		node.content = JSON.stringify(delta);
	}
	try {
		const response = await instance.put('/node', {
			isFile: node.isFile,
			type: node.type,
			name: node.name,
			preview: node.preview,
			content: node.content,
			linkedNode: node.linkedNode,
		});
		dispatch({
			type: CREATE_NODE_SUCCESS,
			payload: response.data.node,
		});
		if (response.status === 200 && node.type === 'text') {
			// if successfully created, redirect the user to the edit node page
			history.push('/edit/text/' + response.data.node.uuid);
		}
	} catch (err) {
		dispatch({ type: CREATE_NODE_ERROR });
		message.error('There was a problem creating that node', 1);
		history.push('/');
	}
};

export const createUrlNode = (node) => async (dispatch) => {
	console.log('create url node');
	dispatch({ type: CREATE_NODE });
	try {
		const response = await instance.put('/url', {
			isFile: node.isFile,
			type: node.type,
			name: node.name,
			preview: node.preview,
			path: node.path,
			content: node.content,
			linkedNode: node.linkedNode,
		});
		dispatch({
			type: CREATE_NODE_SUCCESS,
			payload: response.data.node,
		});
	} catch (err) {
		dispatch({ type: CREATE_NODE_ERROR });
		message.error('There was a problem adding that URL', 1);
		history.push('/');
	}
};

export const markNodeView = (node) => async (dispatch) => {
	dispatch({ type: MARK_NODE_VIEW });
	try {
		await instance.patch('/node/viewed', {
			uuid: node.uuid,
		});
		dispatch({ type: MARK_NODE_VIEW_SUCCESS, node });
	} catch (err) {
		dispatch({ type: MARK_NODE_VIEW_ERROR });
		message.error('Could not mark node view', 1);
		history.push('/');
	}
};

// set active node
export const setActiveNode = (uuid) => async (dispatch) => {
	dispatch({ type: SET_ACTIVE_NODE });
	try {
		const response = await instance.get('/node', {
			params: { uuid },
		});
		dispatch({ type: SET_ACTIVE_NODE_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({ type: SET_ACTIVE_NODE_ERROR });
		history.push('/');
		message.error('Could not retrieve values', 1);
	}
};

export const clearActiveNode = () => {
	return {
		type: CLEAR_ACTIVE_NODE,
	};
};

// delete text node handler
export const deleteNode = (uuid) => async (dispatch) => {
	dispatch({ type: DELETE_NODE });
	try {
		const response = await instance.delete(`/node`, { params: { uuid } });
		if (response.status === 200) {
			history.push('/');
			dispatch({ type: DELETE_NODE_SUCCESS, uuid: uuid });
			message.success('successfully deleted', 1);
		}
	} catch (err) {
		dispatch({ type: DELETE_NODE_ERROR });
		message.error('There was a problem deleting the node', 1);
	}
};

//regenerate collection previews
export const regenerateCollectionPreviews = () => async (dispatch) => {
	try {
		await instance.patch(`/collection/regenerate`);
	} catch (err) {
		message.error('There was a problem regenerating the collection previews', 1);
	}
};

// clear all nodes
export const clearAllNodes = (formValues) => async (dispatch) => {
	try {
		const response = await instance.patch('/user/clear', {
			password: formValues.passwordValue,
		});
		if (response.status === 200) {
			history.push('/');
			message.success('successfully deleted all your data :)', 3);
		}
	} catch (err) {
		console.log(err);
		message.error('There was a problem, please try again', 1);
	}
};
