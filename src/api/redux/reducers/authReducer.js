import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  REFRESH_AUTH,
  REFRESH_AUTH_SUCCESS,
  REFRESH_AUTH_ERROR,
  UPDATE_USER_NODE,
  UPDATE_USER_NODE_ERROR,
  UPDATE_USER_NODE_SUCCESS,
  UPDATE_USER_AVATAR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
  UPDATE_USER_HEADER,
  UPDATE_USER_HEADER_SUCCESS,
  UPDATE_USER_HEADER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isAuth: null,
  isFetching: null,
  user: null,
};

// reducer for authentication state and user object
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return { ...state, isFetching: true };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        isAuth: true,
      };
    case CREATE_ACCOUNT_ERROR:
      return { ...state, isFetching: null, user: null, isAuth: false };
    case SIGN_IN:
      return { ...state, isFetching: true };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        isAuth: true,
      };
    case SIGN_IN_ERROR:
      return { ...state, isFetching: null, user: null, isAuth: false };
    case SIGN_OUT:
      return { ...state, isFetching: true };
    case SIGN_OUT_ERROR:
      return { ...state, isFetching: null };
    case REFRESH_AUTH:
      return {
        ...state,
        isFetching: true,
        user: action.payload,
        isAuth: action.isAuth,
      };
    case REFRESH_AUTH_SUCCESS:
      return { isFetching: null, user: action.payload, isAuth: true };
    case REFRESH_AUTH_ERROR:
      return { ...state, isFetching: null, user: null, isAuth: false };
    case UPDATE_USER_NODE:
      return { ...state, isFetching: true };
    case UPDATE_USER_NODE_SUCCESS:
      return { ...state, isFetching: null, user: action.user };
    case UPDATE_USER_NODE_ERROR:
      return { ...state, isFetching: null };
    case UPDATE_USER_AVATAR:
      return { ...state, isFetching: true };
    case UPDATE_USER_AVATAR_SUCCESS:
      window.location.reload();
      return { ...state, isFetching: null, user: { ...state.user, avatar: action.url } };
    case UPDATE_USER_AVATAR_ERROR:
      return { ...state, isFetching: null };
    case UPDATE_USER_HEADER:
      return { ...state, isFetching: true };
    case UPDATE_USER_HEADER_SUCCESS:
      window.location.reload();
      return { ...state, isFetching: null, user: { ...state.user, header: action.url } };
    case UPDATE_USER_HEADER_ERROR:
      return { ...state, isFetching: null };
    default:
      return state;
  }
};
