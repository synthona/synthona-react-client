import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default axios.create({
	baseURL: 'http://' + window.location.hostname + ':9000',
	withCredentials: true,
	cancelToken: source.token,
});
