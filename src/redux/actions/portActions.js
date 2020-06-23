import instance from '../../api/instance';
import history from '../../utils/history';
import {
  GENERATE_INSTANCE_EXPORT,
  GENERATE_INSTANCE_EXPORT_ERROR,
  GENERATE_INSTANCE_EXPORT_SUCCESS,
} from './types';
import { message } from 'antd';

// export the instance data and get the url of the file
export const generateInstanceExport = () => async (dispatch) => {
  console.log('calling export instance data api endpoint');
  try {
    dispatch({ type: GENERATE_INSTANCE_EXPORT });
    const response = await instance.post('/port/export/all');
    dispatch({ type: GENERATE_INSTANCE_EXPORT_ERROR, payload: response.data });
    if (response.status === 200) {
      // message.success('generated export', 2);
      console.log('generated export!');
    }
    // window.open(response.data.url, '_blank');
  } catch (err) {
    dispatch({ type: GENERATE_INSTANCE_EXPORT_SUCCESS });
    message.error('Could not export instance data', 1);
    history.push('/');
  }
};

// fetch a list of data export urls for this user
// export const fetchInstanceExports = () => async (dispatch) => {};

// export the instance data and get the url of the file
export const unpackSynthonaImport = (uuid) => async (dispatch) => {
  console.log('calling unpack import data api endpoint');
  try {
    // dispatch({ type: GENERATE_INSTANCE_EXPORT });
    const response = await instance.post('/port/import/', { uuid });
    // dispatch({ type: GENERATE_INSTANCE_EXPORT_ERROR, payload: response.data });
    if (response.status === 200) {
      message.success('generated import data!', 1);
      // console.log('generated import data!');
      history.push('/');
    }
    // window.open(response.data.url, '_blank');
  } catch (err) {
    // dispatch({ type: GENERATE_INSTANCE_EXPORT_SUCCESS });
    message.error('Could not import instance data', 1);
    history.push('/');
  }
};
