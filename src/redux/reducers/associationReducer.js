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
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  isSaving: null,
  associationLinkList: [],
  associationLinkListOrder: [],
  associationList: [],
  associationOrder: [],
  totalLinkListItems: null,
  totalAssociationListItems: null,
  associationListPage: 1,
  associationLinkListPage: 1,
};

let associations;
let order;

// reducer for content nodes
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSOCIATION_LINK_LIST:
      return { ...state, isFetching: true };
    case FETCH_ASSOCIATION_LINK_LIST_SUCCESS:
      // TODO: this feels hacky, should revisit this
      // format the associations data and include new values
      associations = { ...state.associationLinkList };
      order = [...state.associationLinkListOrder];
      // loop through and store info
      action.payload.associations.forEach((association) => {
        if (!order.includes(association.id)) {
          order.push(association.id);
        }
        associations[association.id] = association;
      });
      return {
        ...state,
        isFetching: null,
        totalLinkListItems: action.payload.totalItems,
        associationLinkList: associations,
        associationLinkListOrder: order,
        associationLinkListPage: action.page || 1,
      };
    case FETCH_ASSOCIATION_LINK_LIST_ERROR:
      return { ...state, isFetching: null };
    case RESET_ASSOCIATION_LINK_LIST:
      return { ...state, associationLinkList: [], associationLinkListOrder: [] };
    case CREATE_ASSOCIATION:
      return { ...state, isSaving: true };
    case CREATE_ASSOCIATION_SUCCESS:
      return {
        ...state,
        isFetching: null,
        associationLinkList: {
          ...state.associationLinkList,
          [action.associatedNode.id]: action.associatedNode,
        },
        associationLinkListOrder: [
          action.associatedNode.id,
          ...state.associationLinkListOrder.filter((node) => node !== action.associatedNode.id),
        ],
        associationList: {
          ...state.associationList,
          [action.associatedNode.id]: action.associatedNode,
        },
        associationOrder: [
          action.associatedNode.id,
          ...state.associationOrder.filter((node) => node !== action.associatedNode.id),
        ],
      };
    case CREATE_ASSOCIATION_ERROR:
      return { ...state, isSaving: null };
    case FETCH_ASSOCIATIONS:
      return { ...state, isFetching: true };
    case FETCH_ASSOCIATIONS_SUCCESS:
      // TODO: this feels hacky, should revisit this
      // format the associations data and include new values
      associations = { ...state.associationList };
      order = [...state.associationOrder];
      // loop through and store info
      action.payload.associations.forEach((association) => {
        if (!order.includes(association.id)) {
          order.push(association.id);
        }
        associations[association.id] = association;
      });
      return {
        ...state,
        isFetching: null,
        totalAssociationListItems: action.payload.totalItems,
        associationList: associations,
        associationOrder: order,
        associationListPage: action.page || 1,
      };
    case FETCH_ASSOCIATIONS_ERROR:
      return { ...state, isFetching: null };
    case RESET_ASSOCIATIONS:
      return { ...state, associationList: [], associationOrder: [] };
    case MARK_NODE_VIEW:
      return { ...state, isSaving: true };
    case MARK_NODE_VIEW_SUCCESS:
      return {
        ...state,
        isFetching: null,
        nodeList: {
          ...state.nodeList,
        },
        // move the viewed node to the front of the association-order
        associationOrder: [
          action.id,
          ...state.associationOrder.filter((node) => node !== action.id),
        ],
      };
    case MARK_NODE_VIEW_ERROR:
      return { ...state, isSaving: null };
    case DELETE_ASSOCIATION_LINK:
      return { ...state, isSaving: true };
    case DELETE_ASSOCIATION_LINK_SUCCESS:
      // update the association link list
      var newAssociationLinkList = { ...state.associationLinkList };
      delete newAssociationLinkList[action.deletedId];
      // update the association list
      var associationLinkListOrder = [...state.associationLinkListOrder];
      var newAssociationLinkListOrder = associationLinkListOrder.filter(
        (node) => node !== parseInt(action.deletedId)
      );
      // update total items
      var newTotalLinkListItems = state.totalLinkListItems - 1;
      return {
        ...state,
        isSaving: null,
        associationLinkList: newAssociationLinkList,
        associationLinkListOrder: newAssociationLinkListOrder,
        totalLinkListItems: newTotalLinkListItems,
      };
    case DELETE_ASSOCIATION_LINK_ERROR:
      return { ...state, isSaving: null };
    case REMOVE_FROM_ASSOCIATION_LIST:
      // update the association list
      var newAssociationList = { ...state.associationList };
      delete newAssociationList[action.id];
      // update the association order
      var associationOrder = [...state.associationOrder];
      var newAssociationOrder = associationOrder.filter((node) => node !== parseInt(action.id));
      // update total items
      var newTotalItems = state.totalAssociationListItems - 1;
      return {
        ...state,
        isSaving: null,
        associationList: newAssociationList,
        associationOrder: newAssociationOrder,
        totalAssociationListItems: newTotalItems,
      };
    default:
      return state;
  }
};
