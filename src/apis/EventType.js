import Api from './Api';
import Csrf from "./Csrf";

export default {
    async delEventType(id) {

        try {
            await Csrf.getCookie();

            await Api.delete(`/api/event-types/${id}`);
        } catch (error) {
            console.log(error)
        }
    },

    async getEventType(id) {
        try {
            await Csrf.getCookie();

            let eventtype = await Api.get(`/api/event-types/${id}`);
            return eventtype.data

        } catch (error) {

        }
    },

    async getList(data) {
        await Csrf.getCookie();

        return Api.get(`/api/event-types?${data}`);

    },

    async updateEventType(data) {

        await Csrf.getCookie();

        try {

            let result = await Api.put(`/api/event-types/${data.id}`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },

    async addEventType(data) {
        await Csrf.getCookie();

        try {

            let result = await Api.post(`/api/event-types`, data)

        } catch (error) {

            var msg = '';
            for (let erro in error.response.data) {
                msg += error.response.data[erro] + '<br>'
            }

            throw msg;
        }
    },
};