import Api from './Api';
import Csrf from "./Csrf";

export default {
    async del(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/manufacturers/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getManufacturer(id) {
        try {
            await Csrf.getCookie();

            let manufacturer = await Api.get(`/api/manufacturers/${id}`);
            return manufacturer.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/manufacturers?${data}`);

    },

    async updateManufacturer(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/manufacturers/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addManufacturer(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/manufacturers`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};