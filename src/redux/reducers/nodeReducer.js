import {
  CREATE_TEXT_NODE,
  CREATE_TEXT_NODE_SUCCESS,
  CREATE_TEXT_NODE_ERROR,
  FETCH_TEXT_NODE,
  FETCH_TEXT_NODE_SUCCESS,
  FETCH_TEXT_NODE_ERROR,
  EDIT_TEXT_NODE,
  EDIT_TEXT_NODE_SUCCESS,
  EDIT_TEXT_NODE_ERROR,
  FETCH_NODES,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_ERROR,
  UPDATE_NODE,
  UPDATE_NODE_ERROR,
  UPDATE_NODE_SUCCESS,
  DELETE_TEXT_NODE,
  DELETE_TEXT_NODE_SUCCESS,
  DELETE_TEXT_NODE_ERROR,
  PROCESS_TEXT_NODE,
  PROCESS_TEXT_NODE_SUCCESS,
  PROCESS_TEXT_NODE_ERROR,
  CREATE_IMAGE_NODE,
  CREATE_IMAGE_NODE_SUCCESS,
  CREATE_IMAGE_NODE_ERROR,
  FETCH_IMAGE_NODE,
  FETCH_IMAGE_NODE_SUCCESS,
  FETCH_IMAGE_NODE_ERROR,
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
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  isSaving: null,
  nodeList: [],
  nodeOrder: [],
  totalItems: null,
  query: { page: 1 },
  activeNode: null,
};

let nodes;
let newNodeList;
let order;
let newOrder;

// reducer for content nodes
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NODES:
      return { ...state, isFetching: true };
    case FETCH_NODES_SUCCESS:
      // format the nodes data object and include new values
      nodes = { ...state.nodeList };
      order = [...state.nodeOrder];
      action.payload.nodes.forEach((node) => {
        if (!order.includes(node.id)) {
          order.push(node.id);
        }
        nodes[node.id] = node;
      });
      return {
        ...state,
        isFetching: null,
        query: action.query,
        totalItems: action.payload.totalItems,
        nodeList: nodes,
        nodeOrder: order,
      };
    case FETCH_NODES_ERROR:
      return { ...state, isFetching: null };
    case SEARCH_NODES:
      return { ...state, isFetching: true };
    case SEARCH_NODES_SUCCESS:
      // format the nodes data object and include new values
      nodes = {};
      order = [];
      action.payload.nodes.forEach((node) => {
        if (!order.includes(node.id)) {
          order.push(node.id);
        }
        nodes[node.id] = node;
      });
      return {
        ...state,
        isFetching: null,
        query: { page: 1, type: action.query.type, searchQuery: action.query.searchQuery },
        totalItems: action.payload.totalItems,
        nodeList: nodes,
        nodeOrder: order,
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
        nodeList: {
          ...state.nodeList,
          [action.id]: {
            ...state.nodeList[action.id],
            content: action.result.content,
            name: action.result.name,
            summary: action.result.summary,
          },
        },
      };
    case CREATE_TEXT_NODE:
      return { ...state, isSaving: true };
    case CREATE_TEXT_NODE_SUCCESS:
      return {
        ...state,
        isFetching: null,
      };
    case CREATE_TEXT_NODE_ERROR:
      return { ...state, isFetching: null };
    case FETCH_TEXT_NODE:
      return { ...state, isFetching: true };
    case FETCH_TEXT_NODE_SUCCESS:
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
          [action.id]: action.payload,
        },
        nodeOrder: [action.id, ...state.nodeOrder.filter((node) => node !== action.id)],
      };
    case FETCH_TEXT_NODE_ERROR:
      return { ...state, isFetching: null };
    case EDIT_TEXT_NODE:
      return { ...state, isSaving: true };
    case EDIT_TEXT_NODE_SUCCESS:
      return {
        ...state,
        isSaving: null,
        nodeList: {
          ...state.nodeList,
          [action.id]: {
            ...state.nodeList[action.id],
            text: {
              content: action.content,
            },
          },
        },
      };
    case EDIT_TEXT_NODE_ERROR:
      return { ...state, isSaving: null };
    case DELETE_TEXT_NODE:
      return { ...state, isSaving: true };
    case DELETE_TEXT_NODE_SUCCESS:
      // update the nodeList
      newNodeList = { ...state.nodeList };
      delete newNodeList[action.id];
      // update the nodeOrder
      order = [...state.nodeOrder];
      newOrder = order.filter((node) => node !== parseInt(action.id));
      return {
        ...state,
        nodeOrder: newOrder,
        nodeList: newNodeList,
        isSaving: null,
      };
    case DELETE_TEXT_NODE_ERROR:
      return { ...state, isSaving: null };
    case PROCESS_TEXT_NODE:
      return { ...state, isSaving: true };
    case PROCESS_TEXT_NODE_SUCCESS:
      return {
        ...state,
        isSaving: null,
        nodeList: {
          ...state.nodeList,
          [action.id]: { ...state.nodeList[action.id], summary: action.summary },
        },
      };
    case PROCESS_TEXT_NODE_ERROR:
      return { ...state, isSaving: null };
    case CREATE_IMAGE_NODE:
      // TODO! this should actually work similarly to creating a new text node
      // it should even store the image in the same list. it's just that it will
      return { ...state, isSaving: true };
    case CREATE_IMAGE_NODE_SUCCESS:
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
          [action.payload.id]: action.payload,
        },
        nodeOrder: [
          action.payload.id,
          ...state.nodeOrder.filter((node) => node !== action.payload.id),
        ],
      };
    case CREATE_IMAGE_NODE_ERROR:
      return { ...state, isSaving: null };
    case FETCH_IMAGE_NODE:
      return { ...state, isFetching: true };
    case FETCH_IMAGE_NODE_SUCCESS:
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
          [action.id]: action.payload,
        },
        nodeOrder: [action.id, ...state.nodeOrder.filter((node) => node !== action.id)],
      };
    case FETCH_IMAGE_NODE_ERROR:
      return { ...state, isFetching: null };
    case CREATE_NODE:
      return { ...state, isSaving: true };
    case CREATE_NODE_SUCCESS:
      // add new node to list and move to front of node order
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
          [action.payload.id]: action.payload,
        },
        nodeOrder: [
          action.payload.id,
          ...state.nodeOrder.filter((node) => node !== action.payload.id),
        ],
      };
    case CREATE_NODE_ERROR:
      return { ...state, isSaving: null };
    case MARK_NODE_VIEW:
      return { ...state, isSaving: true };
    case MARK_NODE_VIEW_SUCCESS:
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
        },
        // move the viewed node to the front of the node-order
        nodeOrder: [action.id, ...state.nodeOrder.filter((node) => node !== action.id)],
      };
    case MARK_NODE_VIEW_ERROR:
      return { ...state, isSaving: null };
    case SET_ACTIVE_NODE:
      return { ...state, isFetching: true };
    case SET_ACTIVE_NODE_SUCCESS:
      return { ...state, isFetching: null, activeNode: action.payload.node };
    case SET_ACTIVE_NODE_ERROR:
      return { ...state, isFetching: null };
    case DELETE_NODE:
      return { ...state, isSaving: true };
    case DELETE_NODE_SUCCESS:
      // update the nodeList
      newNodeList = { ...state.nodeList };
      delete newNodeList[action.id];
      // update the nodeOrder
      order = [...state.nodeOrder];
      newOrder = order.filter((node) => node !== parseInt(action.id));
      return {
        ...state,
        nodeOrder: newOrder,
        nodeList: newNodeList,
        isSaving: null,
      };
    case DELETE_NODE_ERROR:
      return { ...state, isSaving: null };
    default:
      return state;
  }
};
