import instance from '../../../api/instance';
import history from '../../../utils/history';
import {
	FETCH_GRAPH_DATA,
	FETCH_GRAPH_DATA_ERROR,
	FETCH_GRAPH_DATA_SUCCESS,
	RESET_APP,
} from './types';
import { message } from 'antd';

// fetch a list of nodes
export const fetchGraphData = (query) => async (dispatch) => {
	let localClientConfig = JSON.parse(localStorage.getItem('client-config'));
	let graphRenderLimit = 100;
	if (localClientConfig) {
		graphRenderLimit = localClientConfig.GRAPH_RENDER_LIMIT.value;
	}
	try {
		dispatch({ type: FETCH_GRAPH_DATA });
		const response = await instance.get('/node/graph', {
			params: {
				anchorNode: query.anchorNode,
				type: query.type,
				searchQuery: query.searchQuery,
				graphRenderLimit: graphRenderLimit,
			},
		});
		dispatch({ type: FETCH_GRAPH_DATA_SUCCESS, payload: response.data, query });
	} catch (err) {
		dispatch({ type: FETCH_GRAPH_DATA_ERROR });
		dispatch({ type: RESET_APP });
		message.error('Could not fetch items', 1);
		history.push('/');
	}
};
