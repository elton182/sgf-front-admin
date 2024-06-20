import Api from "./Api";
import Cookie from "js-cookie";

export default {
  getCookie() {
    // let token = Cookie.get("XSRF-TOKEN");

    // if (token) {
    //   return new Promise(resolve => {
    //     resolve(token);
    //   });
    // }

    return Api.get("/api/empresa1/csrf-cookie");
  }
};