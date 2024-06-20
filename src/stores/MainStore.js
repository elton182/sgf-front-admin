import { defineStore } from 'pinia';
import router from '@/routes/index'

import UserApi from '../apis/User.js'

export const useMainStore = defineStore('main', {
    state: () => ({
        user: {},
        loaded: false,
        mode: 'company'
    }),
    getters: {
        getUser: (state) => state.user,
        getLoaded: (state) => state.loaded,
    },
    actions: {
        async clearAllCookies() {
            // Obtém todos os cookies
            console.log('limpando cookies')
            const cookies = document.cookie.split(";");

            // Itera sobre cada cookie e remove
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

                // Define o cookie com uma data de expiração passada
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                console.log('limpando cookie: ' + name)
            }
        },
        init() {
            console.log('iniciando o app')
            console.log(this.loaded)
            if (!this.loaded) {
                this.checkAuth()
            }
        },
        async login(form) {

            await this.clearAllCookies()

            await UserApi.preAuth(form)
            .then( response => {
                this.mode = response.role
            })

            await UserApi.login(form)
                .then(response => {
                    localStorage.setItem("auth", "true");
                    this.loaded = true
                    this.user = response.data.user
                    return true;
                })
                .catch(err => {

                    throw err
                })
        },
        async logout() {
            await UserApi.logout()
                .then(response => {
                    this.user = null;
                    localStorage.clear()


                    // Chama a função para limpar todos os cookies
                    this.clearAllCookies();
                })
                .catch(err => {
                    return err
                })
        },
        register(user) {
            // Simula o registro e login
            this.login(user);
        },
        async checkAuth() {
            //const user = JSON.parse(localStorage.getItem('auth'));
            console.log('verifica se está autenticado')
            await UserApi.checkAuth()
                .then(response => {
                    console.log('está autenticado')
                    this.user = response.data
                    this.loaded = true
                })
                .catch(err => {
                    console.log('não está autenticado')
                    localStorage.removeItem('auth');
                    this.loaded = true
                    router.push('/login')
                })
        }
    }
})