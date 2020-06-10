import {
  GENERATE_INSTANCE_EXPORT,
  GENERATE_INSTANCE_EXPORT_ERROR,
  GENERATE_INSTANCE_EXPORT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  downloadLink: null,
};

// reducer for authentication state and user object
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GENERATE_INSTANCE_EXPORT:
      return { ...state, isFetching: true };
    case GENERATE_INSTANCE_EXPORT_ERROR:
      return {
        ...state,
        isFetching: null,
      };
    case GENERATE_INSTANCE_EXPORT_SUCCESS:
      console.log('export instance data success');
      console.log(action.payload);
      return { ...state, isFetching: null };
    default:
      return state;
  }
};
