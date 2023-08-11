import axios from "axios";
import { apiURL } from "./config";
import store from "./store/storeConfiguration";

const axiosApi = axios.create({
    baseURL: apiURL
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    }
    catch (e) {
        // do nothing, no token exists
    }
    return config;
});

export default axiosApi;