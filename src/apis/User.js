import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    return Api.post("/register", form);
  },

  async login(form) {
    
    console.log('antes pre auth')
   

    await Csrf.getCookie();
    try {
      console.log('login')
      let tenant = localStorage.getItem('tenant');
      let pre_auth = localStorage.getItem('pre_auth');

      localStorage.removeItem('pre_auth')

      form.pre_auth = pre_auth;
      
      return Api.post(`/api/${tenant}/login`, form);
    } catch (error) {
      console.log(error)
    }
  },

  async preAuth(form) {
      
    try {      
      return Api.post("/api/pre-auth", form)
      .then( response => {
        localStorage.setItem('pre_auth', response.data.pre_auth)
        localStorage.setItem('tenant', response.data.tenant)
        localStorage.setItem('role', response.data.role)
        return response.data;
      } )
    } catch (error) {
      console.log(error)
    }
  },


  async logout() {
    await Csrf.getCookie();

    let tenant = localStorage.getItem('tenant');
    return Api.post(`/api/${tenant}/logout`);
  },

  async checkAuth() {
    await Csrf.getCookie();

    let tenant = localStorage.getItem('tenant');
    return Api.get(`/api/${tenant}/user`);
  }
};