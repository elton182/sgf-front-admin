import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async getList(data) {
    await Csrf.getCookie();

    let tenant = localStorage.getItem('tenant');
    return Api.get(`/api/${tenant}/companies?${data}` );
    
  },

  async addCompany(name){
    await Csrf.getCookie();

    let tenant = localStorage.getItem('tenant');
    Api.post(`/api/${tenant}/company`, {name})
    .then (response => {
        return true;
    })
    
  }
}