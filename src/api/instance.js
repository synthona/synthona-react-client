import axios from "axios";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./../api/redux/reducers";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default axios.create({
	baseURL: process.env.REACT_APP_SERVER_PORT
		? "http://" + window.location.hostname + ":" + process.env.REACT_APP_SERVER_PORT
		: "http://" + window.location.hostname + ":" + window.location.port,
	withCredentials: true,
	cancelToken: source.token,
});

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create redux store
export const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
