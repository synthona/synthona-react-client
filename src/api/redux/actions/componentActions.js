import { SHOW_COMPONENT, HIDE_COMPONENT, LOAD_THEME } from './types';
import { setupTheme } from '../../../utils/theme';

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

export const loadTheme = () => {
	let theme = setupTheme();
	return {
		type: LOAD_THEME,
		payload: {
			theme,
		},
	};
};
