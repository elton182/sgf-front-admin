import Api from "./Api";
import Cookie from "js-cookie";

export default {
  getCookie() {   
    let tenant = localStorage.getItem('tenant');
    return Api.get(`/api/csrf-cookie`);
  }
};