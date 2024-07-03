import Api from "./Api";
import Csrf from "./Csrf";

export default {

  async getCompany(company) {
    await Csrf.getCookie();
    
    let response = await Api.get(`/api/company/${company}` );
    return response.data
    
  },

  async updateCompany(data){
    await Csrf.getCookie();

    Api.post(`/api/company-update`, data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then (response => {
        return true;
    })
  },

  async getList(data) {
    await Csrf.getCookie();
    
    return Api.get(`/api/companies?${data}` );
    
  },
  async getUserList(tenant, data) {
    await Csrf.getCookie();
    
    return Api.get(`/api/company/users/${tenant}?${data}` );
    
  },
  
  async addCompany(name){
    await Csrf.getCookie();
    
    Api.post(`/api/company`, {name})
    .then (response => {
        return true;
    })
    
  },

  async addUser(data){
    await Csrf.getCookie();
    
    try {
      
      let result = await Api.post(`/api/company/user`, data)
      
    } catch (error) {
      
      var msg = '';
      for(let erro in error.response.data){
        msg += error.response.data[erro] + '<br>'
      }
      
      throw msg;
    }
        
  },

  async delUser(id, tenant) {
    
    try {
      await Csrf.getCookie();
      
      await Api.delete(`/api/company/user/${tenant}/${id}`);
    } catch (error) {
      console.log(error)
    }
  },


  async delCompany(id){
    await Csrf.getCookie();
    
    Api.delete(`/api/company/${id}` )
    .then (response => {
        return true;
    })
  }
}