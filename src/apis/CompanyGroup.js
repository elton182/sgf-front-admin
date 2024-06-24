import Api from "./Api";
import Csrf from "./Csrf";

export default {

  async getList(tenant, data) {
    await Csrf.getCookie();

    return Api.get(`/api/company/groups/${tenant}?${data}`);

  },

  async getSimpleList(tenant, data) {
    await Csrf.getCookie();

    let list = await Api.get(`/api/company/simple-groups/${tenant}`);

    return list.data;

  },

  async delUserGroup(tenant, id){
    
    try {
      await Csrf.getCookie();

      await Api.delete(`/api/company/group-user/${tenant}/${id}` );
    } catch (error) {
      console.log(error)
    }
    
  },

  async addGroup(data) {
    await Csrf.getCookie();

    try {

      let result = await Api.post(`/api/company/group`, data)

    } catch (error) {

      var msg = '';
      for (let erro in error.response.data) {
        msg += error.response.data[erro] + '<br>'
      }

      throw msg;
    }

  },

  async delGroup(id, tenant) {

    try {
      await Csrf.getCookie();

      await Api.delete(`/api/company/group/${tenant}/${id}`);
    } catch (error) {
      console.log(error)
    }
  },

  async addUserGroup(data) {

    try {
      await Csrf.getCookie();
      let result = await Api.post(`/api/company/group-user`, data)

    } catch (error) {

      var msg = '';
      for (let erro in error.response.data) {
        msg += error.response.data[erro] + '<br>'
      }

      throw msg;
    }
  },

  async getGroupUser(tenant,id) {
    try {
      await Csrf.getCookie();
      let result = await Api.get(`/api/company/group-user/${tenant}?id=${id}`)

      return result.data;
    } catch (error) {

      var msg = '';
      for (let erro in error.response.data) {
        msg += error.response.data[erro] + '<br>'
      }

      throw msg;
    }
  }

}