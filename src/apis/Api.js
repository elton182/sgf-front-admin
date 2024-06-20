import axios from "axios";

let api = axios.create({
    baseURL: "http://localhost:8000/"
});

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;


export default api;