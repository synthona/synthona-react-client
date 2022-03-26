import instance from '../../../api/instance';
import history from '../../../utils/history';
import { GENERATE_EXPORT, GENERATE_EXPORT_ERROR, GENERATE_EXPORT_SUCCESS } from './types';
import { message } from 'antd';

// export the instance data and get the url of the file
export const generateInstanceExport = () => async (dispatch) => {
	message.success('generating export!', 2);
	try {
		dispatch({ type: GENERATE_EXPORT });
		const response = await instance.put('/port/export/all');
		if (response.status === 200) {
			dispatch({ type: GENERATE_EXPORT_SUCCESS, payload: response.data });
			// redirect
			history.push('/');
		}
	} catch (err) {
		dispatch({ type: GENERATE_EXPORT_ERROR });
		message.error('Could not export instance data', 1);
		history.push('/');
	}
};

// generate export based on a node
export const generateExportByUUID = (uuid) => async (dispatch) => {
	message.success('generating export!', 2);
	try {
		dispatch({ type: GENERATE_EXPORT });
		const response = await instance.put('/port/export/', { uuid });
		if (response.status === 200) {
			dispatch({ type: GENERATE_EXPORT_SUCCESS, payload: response.data });
			// redirect
			history.push('/');
		}
	} catch (err) {
		dispatch({ type: GENERATE_EXPORT_ERROR });
		message.error('Could not export instance data', 1);
		history.push('/');
	}
};

// export the instance data and get the url of the file
export const unpackImport = (uuid) => async (dispatch) => {
	try {
		const response = await instance.put('/port/import/', { uuid });
		if (response.status === 200) {
			message.success('started import process!', 3);
			history.push('/');
		}
	} catch (err) {
		message.error('Could not import instance data', 1);
		history.push('/');
	}
};

export const removeImportsByPackage = (uuid) => async (dispatch) => {
	message.success('removing imports...', 1);
	try {
		const response = await instance.patch('/port/export/undo/', { uuid });
		if (response.status === 200) {
			history.push('/');
		}
	} catch (err) {
		message.error('Could not remove imports for this export', 1);
		history.push('/');
	}
};
