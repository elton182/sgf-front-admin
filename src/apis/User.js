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
      
      return Api.post("/api/empresa1/login", form);
    } catch (error) {
      console.log(error)
    }
  },

  async logout() {
    await Csrf.getCookie();

    return Api.post("/logout");
  },

  async checkAuth() {
    await Csrf.getCookie();
    return Api.get("/api/empresa1/user");
  }
};