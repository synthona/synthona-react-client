import { RESET_APP } from '../actions/types';
// custom code
import authReducer from './authReducer';
import nodeReducer from './nodeReducer';
import componentReducer from './componentReducer';
import associationReducer from './associationReducer';
import graphReducer from './graphReducer';

// custom combineReducers
export default (state = {}, action) => {
  // reset app state if need-be
  if (action.type === RESET_APP) {
    state = {};
  }

  // return other reducers
  return {
    auth: authReducer(state.auth, action),
    nodes: nodeReducer(state.nodes, action),
    components: componentReducer(state.components, action),
    associations: associationReducer(state.associations, action),
    graph: graphReducer(state.graph, action),
  };
};
