import { defineStore } from 'pinia';
import router from '@/routes/index'

import UserApi from '../apis/User.js'

export const useMainStore = defineStore('main', {
    state: () => ({
        user: {},
        loaded: false
    }),
    getters: {
        getUser: (state) => state.user,
        getLoaded: (state) => state.loaded,
    },
    actions: {
        init(){
            console.log('iniciando o app')
            console.log(this.loaded)
            if(!this.loaded){
                this.checkAuth()
            }
        },
        async login(form) {                                    

            let status 
            await UserApi.login(form)
            .then( response => {                
                localStorage.setItem("auth", "true");            
                this.loaded = true    
                this.user = response.data.user                 
                return true;
            })
            .catch( err =>{
                
                throw err
            })          
        },
        async logout() {
            await UserApi.logout()
            .then( response => {                
                this.user = null;
                localStorage.removeItem('auth');            
            })
            .catch( err =>{
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
            .then( response => {
                console.log('está autenticado')
                this.user = response.data
                this.loaded = true
            })
            .catch( err =>{
                console.log('não está autenticado')
                localStorage.removeItem('auth'); 
                this.loaded = true
                router.push('/login')
            }) 
        }
    }
})