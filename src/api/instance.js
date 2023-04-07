import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default axios.create({
	baseURL:
		'http://' + window.location.hostname + ':' + process.env.REACT_APP_SERVER_PORT ||
		window.location.port,
	withCredentials: true,
	cancelToken: source.token,
});
