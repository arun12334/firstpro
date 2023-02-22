import axios from "axios";
import Config from "../Config";
// const production = "http://13.234.243.87:3000/";
// const test =  "http://13.235.107.246:3000/"

export const api = axios.create({
    baseURL: Config.BaseURL
});

export const cancelToken = () => {
    return axios.CancelToken.source()
}

// api.defaults.headers.common['Authorization'] = localStorage.getItem('token') || "";

api.interceptors.request.use(function (config) {
    return config;
}, function (error) {   
    return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    // console.log("response", response);
    return response;
}, function (error) {
    return Promise.reject(error);
});