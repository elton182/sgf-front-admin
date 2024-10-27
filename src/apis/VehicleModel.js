import Api from './Api';
import Csrf from "./Csrf";

export default {
    async del(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/vehicle-models/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getVehicleModel(id) {
        try {
            await Csrf.getCookie();

            let vehiclemodel = await Api.get(`/api/vehicle-models/${id}`);
            return vehiclemodel.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/vehicle-models?${data}`);

    },

    async updateVehicleModel(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/vehicle-models/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addVehicleModel(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/vehicle-models`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};