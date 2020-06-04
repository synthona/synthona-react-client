import {
  FETCH_ASSOCIATION_LINK_LIST,
  FETCH_ASSOCIATION_LINK_LIST_SUCCESS,
  FETCH_ASSOCIATION_LINK_LIST_ERROR,
  RESET_ASSOCIATION_LINK_LIST,
  CREATE_ASSOCIATION_SUCCESS,
  CREATE_ASSOCIATION,
  CREATE_ASSOCIATION_ERROR,
  FETCH_ASSOCIATIONS,
  FETCH_ASSOCIATIONS_SUCCESS,
  FETCH_ASSOCIATIONS_ERROR,
  RESET_ASSOCIATIONS,
  MARK_NODE_VIEW,
  MARK_NODE_VIEW_ERROR,
  MARK_NODE_VIEW_SUCCESS,
  DELETE_ASSOCIATION_LINK,
  DELETE_ASSOCIATION_LINK_ERROR,
  DELETE_ASSOCIATION_LINK_SUCCESS,
  REMOVE_FROM_ASSOCIATION_LIST,
  SET_ACTIVE_NODE,
  SET_ACTIVE_NODE_ERROR,
  SET_ACTIVE_NODE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  isSaving: null,
  associationLinkList: [],
  associationList: [],
  totalLinkListItems: null,
  totalAssociationListItems: null,
  associationListPage: 1,
  associationLinkListPage: 1,
  activeNode: null,
};

let newAssociationList;

// reducer for content nodes
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSOCIATION_LINK_LIST:
      return { ...state, isFetching: true };
    case FETCH_ASSOCIATION_LINK_LIST_SUCCESS:
      // // format the associations data and include new values
      var associationLinkListArray = [...state.associationLinkList];
      // update the association link list with the new values
      Object.values(action.payload.associations).forEach((node) => {
        if (!associationLinkListArray.some((item) => item.uuid === node.uuid)) {
          associationLinkListArray.push(node);
          if (associationLinkListArray.length > 100) {
            // if the length gets too long free up some memory
            // associationLinkListArray.splice(0, 2);
            associationLinkListArray.splice(0, 30);
            // associationLinkListArray.shift();
          }
        }
      });
      return {
        ...state,
        isFetching: null,
        totalLinkListItems: action.payload.totalItems,
        associationLinkList: associationLinkListArray,
        associationLinkListPage: action.page || 1,
      };
    case FETCH_ASSOCIATION_LINK_LIST_ERROR:
      return { ...state, isFetching: null };
    case RESET_ASSOCIATION_LINK_LIST:
      return { ...state, associationLinkList: [] };
    case FETCH_ASSOCIATIONS:
      return { ...state, isFetching: true };
    case FETCH_ASSOCIATIONS_SUCCESS:
      // format the associations data and include new values
      var associationsArray = [...state.associationList];
      // update the association link list with the new values
      Object.values(action.payload.associations).forEach((node) => {
        if (!associationsArray.some((item) => item.uuid === node.uuid)) {
          associationsArray.push(node);
          if (associationsArray.length > 100) {
            // if the length gets too long free up some memory
            // associationLinkListArray.splice(0, 2);
            // picked a number that is divisible by both 2 and 3
            associationsArray.splice(0, 30);
            // associationLinkListArray.shift();
          }
        }
      });
      return {
        ...state,
        isFetching: null,
        totalAssociationListItems: action.payload.totalItems,
        associationList: associationsArray,
        associationListPage: action.page || 1,
      };
    case FETCH_ASSOCIATIONS_ERROR:
      return { ...state, isFetching: null };
    case RESET_ASSOCIATIONS:
      return { ...state, associationList: [] };
    case CREATE_ASSOCIATION:
      return { ...state, isSaving: true };
    case CREATE_ASSOCIATION_SUCCESS:
      // only add the node to the association list if one of the nodes is the activeNode
      if (
        state.activeNode &&
        (action.associatedNode.uuid === state.activeNode.uuid ||
          action.nodeUUID === state.activeNode.uuid)
      ) {
        newAssociationList = [action.associatedNode, ...state.associationList];
      } else {
        newAssociationList = [...state.associationList];
      }
      return {
        ...state,
        isFetching: null,
        associationLinkList: [action.associatedNode, ...state.associationLinkList],
        associationList: newAssociationList,
        totalAssociationListItems: state.totalAssociationListItems + 1,
      };
    case CREATE_ASSOCIATION_ERROR:
      return { ...state, isSaving: null };
    case MARK_NODE_VIEW:
      return { ...state, isSaving: true };
    case MARK_NODE_VIEW_SUCCESS:
      // only add back to list if the node was already in the list
      var addBackToList = state.associationList.some((node) => node.uuid === action.node.uuid)
        ? action.node
        : false;
      // use addBackToList to determine what should be returned
      if (addBackToList) {
        newAssociationList = [
          state.associationList.some((node) => node.uuid === action.node.uuid) ? action.node : null,
          ...state.associationList.filter((node) => node.uuid !== action.node.uuid),
        ];
      } else {
        newAssociationList = [...state.associationList];
      }
      return {
        ...state,
        isFetching: null,
        // move the viewed node to the front of the list
        associationList: newAssociationList,
      };
    case MARK_NODE_VIEW_ERROR:
      return { ...state, isSaving: null };
    case SET_ACTIVE_NODE:
      return { ...state, isFetching: true };
    case SET_ACTIVE_NODE_SUCCESS:
      return { ...state, isFetching: null, activeNode: action.payload.node };
    case SET_ACTIVE_NODE_ERROR:
      return { ...state, isFetching: null };
    case DELETE_ASSOCIATION_LINK:
      return { ...state, isSaving: true };
    case DELETE_ASSOCIATION_LINK_SUCCESS:
      // update total items
      var newTotalLinkListItems = state.totalLinkListItems - 1;
      return {
        ...state,
        isSaving: null,
        associationLinkList: [
          ...state.associationLinkList.filter((node) => node.uuid !== action.deletedUUID),
        ],
        totalLinkListItems: newTotalLinkListItems,
      };
    case DELETE_ASSOCIATION_LINK_ERROR:
      return { ...state, isSaving: null };
    case REMOVE_FROM_ASSOCIATION_LIST:
      // update total items
      var newTotalItems = state.totalAssociationListItems - 1;
      return {
        ...state,
        isSaving: null,
        associationList: [
          ...state.associationList.filter((node) => node.uuid !== action.deletedUUID),
        ],
        totalAssociationListItems: newTotalItems,
      };
    default:
      return state;
  }
};
