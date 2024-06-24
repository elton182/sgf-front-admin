import Api from "./Api";
import Csrf from "./Csrf";

export default { 
 
  async getList(tenant, data) {
    await Csrf.getCookie();
    
    return Api.get(`/api/company/users/${tenant}?${data}` );
    
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

}