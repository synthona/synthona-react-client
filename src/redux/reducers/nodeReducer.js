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
  PROCESS_TEXT_NODE,
  PROCESS_TEXT_NODE_SUCCESS,
  PROCESS_TEXT_NODE_ERROR,
  CREATE_FILE_NODE,
  CREATE_FILE_NODE_SUCCESS,
  CREATE_FILE_NODE_ERROR,
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
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  isSaving: null,
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
      // update node without changing its position in nodeList
      var newList = [...state.nodeList];
      newList[action.result.uuid] = action.result;
      return {
        ...state,
        isSaving: null,
        nodeList: newList,
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
        // update the summary in the nodelist
        // leave everything else as-is
        nodeList: state.nodeList.map((node) => {
          // only update it for the processsed node
          if (node.uuid === action.node.uuid) {
            node.summary = action.node.summary;
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
    case CREATE_NODE:
      return { ...state, isSaving: true };
    case CREATE_NODE_SUCCESS:
      // add new node to list and move to front of node order
      return {
        ...state,
        isFetching: null,
        nodeList: [action.payload, ...state.nodeList],
        activeNode: action.payload.node,
      };
    case CREATE_NODE_ERROR:
      return { ...state, isSaving: null };
    case MARK_NODE_VIEW:
      return { ...state, isSaving: true };
    case MARK_NODE_VIEW_SUCCESS:
      return {
        ...state,
        isFetching: null,
        // move node to front of nodelist
        nodeList: [action.node, ...state.nodeList.filter((node) => node.uuid !== action.node.uuid)],
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
      return { ...state, isSaving: true };
    case DELETE_NODE_SUCCESS:
      return {
        ...state,
        // filter the node out of the list
        nodeList: [...state.nodeList.filter((node) => node.uuid !== action.uuid)],
        isSaving: null,
      };
    case DELETE_NODE_ERROR:
      return { ...state, isSaving: null };
    default:
      return state;
  }
};
