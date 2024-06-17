import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    return Api.post("/register", form);
  },

  async login(form) {
    await Csrf.getCookie();

    try {
      
      return Api.post("/api/login", form);
    } catch (error) {
      console.log(error)
    }
  },

  async logout() {
    await Csrf.getCookie();

    return Api.post("/api/logout");
  },

  async checkAuth() {
    return await Api.get("/user");
  }
};