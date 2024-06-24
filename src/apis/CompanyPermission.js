import Api from "./Api";
import Csrf from "./Csrf";

export default {

    async getList(tenant, data) {
        await Csrf.getCookie();

        return Api.get(`/api/company/permissions/${tenant}?${data}`);

    },

    async getSimpleList(tenant, data) {
        await Csrf.getCookie();

        let list = await Api.get(`/api/company/simple-permissions/${tenant}`);

        return list.data;

    },

    async delPermissiocnGroup(tenant, id) {
        try {
            await Csrf.getCookie();

            await Api.delete(`/api/company/group-permission/${tenant}/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async addPermissionGroup(data) {
        try {
            await Csrf.getCookie();
            let result = await Api.post(`/api/company/group-permission`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async getGroupPermission(tenant, id) {
        try {
            await Csrf.getCookie();
            let result = await Api.get(`/api/company/group-permission/${tenant}?id=${id}`)

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