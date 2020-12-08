import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_DATA_ERROR,
  FETCH_GRAPH_DATA_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  graphNodeList: [],
  graphAssociationList: [],
  totalItems: null,
  query: { page: 1 },
  activeNode: null,
  graphData: null,
};

// reducer for content nodes
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GRAPH_DATA:
      return { ...state, isFetching: true };
    case FETCH_GRAPH_DATA_ERROR:
      return { ...state, isFetching: null };
    case FETCH_GRAPH_DATA_SUCCESS:
      // format nodes
      const nodeArray = [];
      action.payload.nodes.map((node) => {
        return nodeArray.push(node);
      });
      // format associations
      const associationArray = [];
      action.payload.associations.map((association) => {
        const reformated = { source: association.nodeId, target: association.linkedNode };
        return associationArray.push(reformated);
      });
      return {
        ...state,
        isFetching: null,
        graphData: { nodes: nodeArray, associations: associationArray },
      };
    default:
      return state;
  }
};
