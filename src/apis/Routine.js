import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async getList(data) {
    await Csrf.getCookie();
    
    return Api.get(`/api/routines?${data}` );
    
  },
  
  async addRoutine(name){
    await Csrf.getCookie();
    
    Api.post(`/api/routine`, {name})
    .then (response => {
        return true;
    })
    
  },

  async addRoutine(data){
    await Csrf.getCookie();
    
    try {
      
      let result = await Api.post(`/api/routine`, data)
      
    } catch (error) {
      
      var msg = '';
      for(let erro in error.response.data){
        msg += error.response.data[erro] + '<br>'
      }
      
      throw msg;
    }
        
  },

  async delRoutine(id) {
    
    try {
      await Csrf.getCookie();
      
      await Api.delete(`/api/routine/${id}`);
    } catch (error) {
      console.log(error)
    }
  },


}