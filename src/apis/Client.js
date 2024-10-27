import Api from "./Api";
import Csrf from "./Csrf";

export default {
 
  async delClient(id) {
    
    try {
      await Csrf.getCookie();  
      
      await Api.delete(`/api/clients/${id}`);
    } catch (error) {
      console.log(error)
    }
  },

  async getClient(id){
    try {
      await Csrf.getCookie();  
      
      let client = await Api.get(`/api/clients/${id}`);
      return client.data
      
    } catch (error){

    }
  },

  async getList(data) {
    await Csrf.getCookie();

    return Api.get(`/api/clients?${data}` );
    
  },
   
  async updateClient(data){
    
    await Csrf.getCookie();
    
    try {
      
      let result = await Api.put(`/api/clients/${data.id}`, data)
      
    } catch (error) {
      
      var msg = '';
      for(let erro in error.response.data){
        msg += error.response.data[erro] + '<br>'
      }
      
      throw msg;
    }
  },

  async addClient(data){
    await Csrf.getCookie();
    
    try {
      
      let result = await Api.post(`/api/clients`, data)
      
    } catch (error) {
      
      var msg = '';
      for(let erro in error.response.data){
        msg += error.response.data[erro] + '<br>'
      }
      
      throw msg;
    }
  },
};