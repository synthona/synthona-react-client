import instance from '../../instance';
import {
	CREATE_FILE_NODE,
	CREATE_FILE_NODE_SUCCESS,
	CREATE_FILE_NODE_ERROR,
	LINK_FILE_NODES,
	LINK_FILE_NODES_SUCCESS,
	LINK_FILE_NODES_ERROR,
} from './types';
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

export const linkFileNodes = (fileList, linkedNode) => async (dispatch) => {
	dispatch({ type: LINK_FILE_NODES });
	try {
		// send the request
		const response = await instance.put('/file/link', {
			fileList: JSON.stringify(fileList),
			linkedNode: linkedNode,
		});
		console.log(response.data.nodes);
		// if it's sucessful dispatch the success action
		if (response.status === 200) {
			dispatch({ type: LINK_FILE_NODES_SUCCESS, nodes: response.data.nodes });
		} else {
			message.error('There was a problem creating the file nodes', 1);
		}
	} catch (err) {
		dispatch({ type: LINK_FILE_NODES_ERROR });
		message.error('There was a problem creating the file nodes', 1);
	}
};

export const launchFileNode = (uuid) => async (dispatch) => {
	message.success('loading...', 1);
	try {
		// send the request
		await instance.put('/file/launch', { uuid });
	} catch (err) {
		message.error('There was a problem launching the file', 1);
		window.location.reload();
	}
};

export const openFileInExplorer = (uuid) => async (dispatch) => {
	message.success('loading...', 1);
	try {
		// send the request
		await instance.put('/file/explorer', { uuid });
	} catch (err) {
		message.error('There was a problem opening the file in the file explorer', 1);
		window.location.reload();
	}
};
