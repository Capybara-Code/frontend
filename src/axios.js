import axios from 'axios';
const instance = axios.create({ baseURL: 'http://172.17.227.71:8080' })
export default instance
