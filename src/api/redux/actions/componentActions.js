import { SHOW_COMPONENT, HIDE_COMPONENT } from './types';

export const showComponent = (type, content) => {
  return {
    type: SHOW_COMPONENT,
    payload: {
      type: type,
      content: content,
    },
  };
};

export const hideComponent = (type) => {
  return {
    type: HIDE_COMPONENT,
    payload: {
      type: type,
    },
  };
};
