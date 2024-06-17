import { defineStore } from 'pinia';

import UserApi from '../apis/User.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(form) {                                    

            let status 
            await UserApi.login(form)
            .then( response => {
                
                localStorage.setItem("auth", "true");                
                this.user = response.user                 
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
            await UserApi.checkAuth(form)
            .then( response => {
                return true
            })
            .catch( err =>{
                
                throw err
            }) 
        }
    }
});