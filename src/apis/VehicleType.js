import Api from './Api';
import Csrf from "./Csrf";

export default {
    async del(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/vehicle-types/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getVehicleType(id) {
        try {
            await Csrf.getCookie();

            let vehicletype = await Api.get(`/api/vehicle-types/${id}`);
            return vehicletype.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/vehicle-types?${data}`);

    },

    async updateVehicleType(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/vehicle-types/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addVehicleType(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/vehicle-types`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};