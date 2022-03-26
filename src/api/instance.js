import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default axios.create({
	// baseURL: 'http://localhost:3077',
	baseURL: 'http://' + window.location.hostname + ':3077',
	withCredentials: true,
	cancelToken: source.token,
});
