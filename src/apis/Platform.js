import Api from './Api';
import Csrf from "./Csrf";

export default {
    async del(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/platforms/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getPlatform(id) {
        try {
            await Csrf.getCookie();

            let platform = await Api.get(`/api/platforms/${id}`);
            return platform.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/platforms?${data}`);

    },

    async updatePlatform(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/platforms/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addPlatform(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/platforms`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};