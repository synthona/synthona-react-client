import {
	EDIT_TEXT_NODE,
	EDIT_TEXT_NODE_SUCCESS,
	EDIT_TEXT_NODE_ERROR,
	FETCH_NODES,
	FETCH_NODES_SUCCESS,
	FETCH_NODES_ERROR,
	UPDATE_NODE,
	UPDATE_NODE_ERROR,
	UPDATE_NODE_SUCCESS,
	UPDATE_ACTIVE_NODE,
	UPDATE_ACTIVE_NODE_ERROR,
	UPDATE_ACTIVE_NODE_SUCCESS,
	PROCESS_TEXT_NODE,
	PROCESS_TEXT_NODE_SUCCESS,
	PROCESS_TEXT_NODE_ERROR,
	CREATE_FILE_NODE,
	CREATE_FILE_NODE_SUCCESS,
	CREATE_FILE_NODE_ERROR,
	LINK_FILE_NODES,
	LINK_FILE_NODES_ERROR,
	LINK_FILE_NODES_SUCCESS,
	SEARCH_NODES,
	SEARCH_NODES_SUCCESS,
	SEARCH_NODES_ERROR,
	MARK_NODE_VIEW,
	MARK_NODE_VIEW_SUCCESS,
	MARK_NODE_VIEW_ERROR,
	CREATE_NODE,
	CREATE_NODE_SUCCESS,
	CREATE_NODE_ERROR,
	SET_ACTIVE_NODE,
	SET_ACTIVE_NODE_SUCCESS,
	SET_ACTIVE_NODE_ERROR,
	DELETE_NODE,
	DELETE_NODE_ERROR,
	DELETE_NODE_SUCCESS,
	CLEAR_ACTIVE_NODE,
	GENERATE_EXPORT,
	GENERATE_EXPORT_ERROR,
	GENERATE_EXPORT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
	isFetching: null,
	isSaving: null,
	isDeleting: null,
	nodeList: [],
	totalItems: null,
	query: { page: 1 },
	activeNode: null,
};

// reducer for content nodes
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_NODES:
			return { ...state, isFetching: true };
		case FETCH_NODES_SUCCESS:
			var nodesArray;
			// reset nodesArray if page number has decreased
			if (action.query.page > state.query.page) {
				nodesArray = [...state.nodeList];
			} else {
				nodesArray = [];
			}
			// update the nodelist with the new values
			Object.values(action.payload.nodes).forEach((node) => {
				if (!nodesArray.some((item) => item.uuid === node.uuid)) {
					nodesArray.push(node);
				}
			});
			if (nodesArray.length > 100) {
				// if the length gets too long free up some memory
				nodesArray.splice(0, action.payload.nodes.length);
			}
			return {
				...state,
				isFetching: null,
				query: action.query,
				totalItems: action.payload.totalItems,
				nodeList: nodesArray,
			};
		case FETCH_NODES_ERROR:
			return { ...state, isFetching: null };
		case SEARCH_NODES:
			return { ...state, isFetching: true };
		case SEARCH_NODES_SUCCESS:
			nodesArray = [];
			// update the nodelist with the new values
			Object.values(action.payload.nodes).forEach((node) => {
				if (!nodesArray.some((item) => item.uuid === node.uuid)) {
					nodesArray.push(node);
				}
			});
			if (nodesArray.length > 100) {
				// if the length gets too long free up some memory
				nodesArray.splice(0, action.payload.nodes.length);
			}
			return {
				...state,
				isFetching: null,
				query: { page: 1, type: action.query.type, searchQuery: action.query.searchQuery },
				totalItems: action.payload.totalItems,
				nodeList: nodesArray,
			};
		case SEARCH_NODES_ERROR:
			return { ...state, isFetching: null };
		case UPDATE_NODE:
			return { ...state, isSaving: true };
		case UPDATE_NODE_ERROR:
			return { ...state, isSaving: null };
		case UPDATE_NODE_SUCCESS:
			return {
				...state,
				isSaving: null,
				nodeList: state.nodeList.map((node) => {
					if (node.uuid === action.result.uuid) {
						node = action.result;
					}
					return node;
				}),
			};
		case UPDATE_ACTIVE_NODE:
			return { ...state, isSaving: true };
		case UPDATE_ACTIVE_NODE_ERROR:
			return { ...state, isSaving: null };
		case UPDATE_ACTIVE_NODE_SUCCESS:
			return {
				...state,
				isSaving: null,
				activeNode: action.result.uuid === state.activeNode.uuid ? action.result : state.activeNode,
				nodeList: state.nodeList.map((node) => {
					if (node.uuid === action.result.uuid) {
						node = action.result;
					}
					return node;
				}),
			};
		case EDIT_TEXT_NODE:
			return { ...state, isSaving: true };
		case EDIT_TEXT_NODE_SUCCESS:
			return {
				...state,
				isSaving: null,
				// update the content on the activeNode
				activeNode: {
					...state.activeNode,
					content: action.node.content,
				},
			};
		case EDIT_TEXT_NODE_ERROR:
			return { ...state, isSaving: null };
		case PROCESS_TEXT_NODE:
			return { ...state, isSaving: true };
		case PROCESS_TEXT_NODE_SUCCESS:
			return {
				...state,
				isSaving: null,
				// update the preview in the nodelist
				// leave everything else as-is
				nodeList: state.nodeList.map((node) => {
					// only update it for the processsed node
					if (node.uuid === action.node.uuid) {
						node.preview = action.node.preview;
					}
					return node;
				}),
			};
		case PROCESS_TEXT_NODE_ERROR:
			return { ...state, isSaving: null };
		case CREATE_FILE_NODE:
			return { ...state, isSaving: true };
		case CREATE_FILE_NODE_SUCCESS:
			return {
				...state,
				isFetching: null,
				nodeList: [action.payload, ...state.nodeList],
			};
		case CREATE_FILE_NODE_ERROR:
			return { ...state, isSaving: null };
		case LINK_FILE_NODES:
			return { ...state, isSaving: true };
		case LINK_FILE_NODES_SUCCESS:
			var linkNodesArray = [];
			// update the nodelist with the new values
			action.nodes.forEach((node) => {
				linkNodesArray.push(node);
			});
			return {
				...state,
				isSaving: null,
				nodeList: [...linkNodesArray, ...state.nodeList],
			};
		case LINK_FILE_NODES_ERROR:
			return { ...state, isSaving: null };
		case CREATE_NODE:
			return { ...state, isSaving: true };
		case CREATE_NODE_SUCCESS:
			// add new node to list and move to front of node order
			return {
				...state,
				isFetching: null,
				nodeList: [
					action.payload,
					...state.nodeList.filter((node) => node.uuid !== action.payload.uuid),
				],
				activeNode: action.payload.node,
			};
		case CREATE_NODE_ERROR:
			return { ...state, isSaving: null };
		case MARK_NODE_VIEW:
			return { ...state, isSaving: true };
		case MARK_NODE_VIEW_SUCCESS:
			var newNodeList;
			// only send the node back to the beginning if the user is at the top of the list
			if (state.nodeList.length < 20) {
				newNodeList = [
					action.node,
					...state.nodeList.filter((node) => node.uuid !== action.node.uuid),
				];
			} else {
				// otherwise just make it "disapear" to reappaar when they return to the top
				newNodeList = [...state.nodeList.filter((node) => node.uuid !== action.node.uuid)];
			}
			return {
				...state,
				isSaving: null,
				nodeList: newNodeList,
			};
		case MARK_NODE_VIEW_ERROR:
			return { ...state, isSaving: null };
		case SET_ACTIVE_NODE:
			return { ...state, isFetching: true };
		case SET_ACTIVE_NODE_SUCCESS:
			return { ...state, isFetching: null, activeNode: action.payload.node };
		case SET_ACTIVE_NODE_ERROR:
			return { ...state, isFetching: null };
		case CLEAR_ACTIVE_NODE:
			return { ...state, activeNode: null };
		case DELETE_NODE:
			return { ...state, isDeleting: true };
		case DELETE_NODE_SUCCESS:
			return {
				...state,
				// filter the node out of the list
				nodeList: [...state.nodeList.filter((node) => node.uuid !== action.uuid)],
				isDeleting: null,
			};
		case DELETE_NODE_ERROR:
			return { ...state, isDeleting: null };
		case GENERATE_EXPORT:
			return { ...state, isSaving: true };
		case GENERATE_EXPORT_ERROR:
			return {
				...state,
				isSaving: null,
			};
		case GENERATE_EXPORT_SUCCESS:
			return {
				...state,
				isSaving: null,
			};
		default:
			return state;
	}
};
