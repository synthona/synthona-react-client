import instance from '../../../api/instance';
import { GENERATE_EXPORT, GENERATE_EXPORT_ERROR, GENERATE_EXPORT_SUCCESS } from './types';
import { message } from 'antd';

// export the instance data and get the url of the file
export const generateInstanceExport = () => async (dispatch) => {
  message.success('generating export...', 2);
  try {
    dispatch({ type: GENERATE_EXPORT });
    const response = await instance.put('/port/export/all');
    if (response.status === 200) {
      message.success('generated export', 2);
      dispatch({ type: GENERATE_EXPORT_SUCCESS, payload: response.data });
      // redirect
      window.location.replace('/');
    }
  } catch (err) {
    dispatch({ type: GENERATE_EXPORT_ERROR });
    message.error('Could not export instance data', 1);
    window.location.replace('/');
  }
};

// generate export based on a node
export const generateExportByUUID = (uuid) => async (dispatch) => {
  message.success('generating export...', 2);
  try {
    dispatch({ type: GENERATE_EXPORT });
    const response = await instance.put('/port/export/', { uuid });
    if (response.status === 200) {
      message.success('generated export', 2);
      dispatch({ type: GENERATE_EXPORT_SUCCESS, payload: response.data });
      // redirect
      window.location.replace('/');
    }
  } catch (err) {
    dispatch({ type: GENERATE_EXPORT_ERROR });
    message.error('Could not export instance data', 1);
    window.location.replace('/');
  }
};

// export the instance data and get the url of the file
export const unpackSynthonaImport = (uuid) => async (dispatch) => {
  // console.log('generated import data!');
  message.success('generating imports...', 1);
  try {
    const response = await instance.put('/port/import/', { uuid });
    if (response.status === 200) {
      message.success('generated import data!', 1);
      // console.log('generated import data!');
      window.location.replace('/');
    }
  } catch (err) {
    message.error('Could not import instance data', 1);
    window.location.replace('/');
  }
};

export const removeSynthonaImportsByPackage = (uuid) => async (dispatch) => {
  message.success('removing imports...', 1);
  try {
    const response = await instance.patch('/port/export/undo/', { uuid });
    if (response.status === 200) {
      message.success('removed imports from this package!', 1);
      // console.log('generated import data!');
      window.location.replace('/');
    }
  } catch (err) {
    message.error('Could not remove imports for this package', 1);
    window.location.replace('/');
  }
};
