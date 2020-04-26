import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  modalInfo: { visible: false, type: null, content: null }
};

// reducer for modals
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalInfo: {
          visible: true,
          type: action.payload.type,
          content: action.payload.content
        }
      };
    case HIDE_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
