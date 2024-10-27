import Api from './Api';
import Csrf from "./Csrf";

export default {
    async del(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/brands/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getBrand(id) {
        try {
            await Csrf.getCookie();

            let brand = await Api.get(`/api/brands/${id}`);
            return brand.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/brands?${data}`);

    },

    async updateBrand(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/brands/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addBrand(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/brands`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};