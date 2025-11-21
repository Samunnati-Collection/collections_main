import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + '/api' : 'http://localhost:4000/api' });
export default API;
