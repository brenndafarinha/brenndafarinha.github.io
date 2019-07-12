import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.jdoodle.com'
})



export default api;

