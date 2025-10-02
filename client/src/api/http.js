import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});


// Manejo básico de errores
http.interceptors.response.use(
    res => res,
    err => {
        return Promise.reject(err.response.data);
    }
);

export default http;
