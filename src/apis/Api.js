import axios from "axios";

let api = axios.create({
    baseURL: "http://localhost:8000/"
});

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.data.message == "Unauthenticated."){
        localStorage.clear()
    }
    
    return Promise.reject(error);
  });


export default api;
