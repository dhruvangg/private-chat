import axios from "axios";

console.log('BACKEND_URI', import.meta.env.VITE_BACKEND_URI);


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
});

export default axiosInstance;