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
      console.log('login')
          
      return Api.post(`/api/login`, form);
    } catch (error) {
      console.log(error)
    }
  },

  async delUser(id) {
    
    try {
      await Csrf.getCookie();  
      
      await Api.delete(`/api/user/${id}`);
    } catch (error) {
      console.log(error)
    }
  },

  async logout() {
    await Csrf.getCookie();

    return Api.post(`/api/logout`);
  },

  async checkAuth() {
    await Csrf.getCookie();

    return Api.get(`/api/user`);
  },

  async getList(data) {
    await Csrf.getCookie();

    return Api.get(`/api/users?${data}` );
    
  },

  async addUser(data){
    await Csrf.getCookie();
    
    try {
      
      let result = await Api.post(`/api/user`, data)
      
    } catch (error) {
      
      var msg = '';
      for(let erro in error.response.data){
        msg += error.response.data[erro] + '<br>'
      }
      
      throw msg;
    }
    
   
    
  },
};