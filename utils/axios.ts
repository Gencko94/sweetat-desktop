import axios from 'axios';
const instance = axios.create({ baseURL: 'https://sweetat.co/public/api' });
export default instance;
