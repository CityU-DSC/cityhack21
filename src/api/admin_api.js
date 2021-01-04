import adminAxios from 'axios'

const service = adminAxios.create({
    baseURL: process.env.NODE_ENV==="development"? "http://localhost:3000/api/admin" : "https://cityhack21.com/api/admin",
    timeout: 3000,
});

// request interceptors
service.interceptors.request.use((config) => config, (error) => {
    console.log('[Admin Axios]: request error');
    return Promise.reject(error)
});

// response interceptors
service.interceptors.response.use((response) => {
    console.log('[Admin Axios]: get response');
    return response.data
}, (error) => {
    const {response = {}} = error;
    const {data = null} = response;
    console.log('error = ', data); // for debug
    return Promise.reject(data || error)
});

export default service;
