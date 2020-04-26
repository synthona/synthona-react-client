import { SHOW_MODAL, HIDE_MODAL } from './types';

export const showModal = (type, content) => {
  return {
    type: SHOW_MODAL,
    payload: {
      type: type,
      content: content
    }
  };
};

export const hideModal = type => {
  return {
    type: HIDE_MODAL
  };
};
