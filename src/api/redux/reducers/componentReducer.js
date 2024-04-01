import { SHOW_COMPONENT, HIDE_COMPONENT, LOAD_THEME } from "../actions/types";

const INITIAL_STATE = {
	componentList: {},
};

// reducer for UI components which need to store redux state
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_COMPONENT:
			return {
				...state,
				componentList: {
					...state.componentList,
					[action.payload.type]: { content: action.payload.content, visible: true },
				},
			};
		case HIDE_COMPONENT:
			return {
				...state,
				componentList: {
					...state.componentList,
					[action.payload.type]: null,
				},
			};
		case LOAD_THEME:
			return {
				...state,
				theme: action.payload.theme,
				editorTheme: action.payload.editorTheme,
			};
		default:
			return state;
	}
};
