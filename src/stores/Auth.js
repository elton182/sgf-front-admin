import { defineStore } from 'pinia';

import UserApi from '../apis/User.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        login(user) {
            this.user = user;
            localStorage.setItem('auth', JSON.stringify(user));
            this.$router.push('/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('auth');
            this.$router.push('/login');
        },
        register(user) {
            // Simula o registro e login
            this.login(user);
        },
        checkAuth() {
            const user = JSON.parse(localStorage.getItem('auth'));
            if (user) {
                this.user = user;
            }
        }
    }
});