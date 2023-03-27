import axios from "axios";

// main api call
const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

// for inserting the access token into the local storage
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//for removing access token from local storage
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
    }
});

export default axiosClient;