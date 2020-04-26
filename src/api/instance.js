import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// function readCookie(a) {
//   var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
//   return b ? b.pop() : '';
// }

export default axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true,
  cancelToken: source.token
});
