<template>
    <div class="login-container">
        <md-card class="login-card " md-theme="purple-card">
            <md-card-header class="login-card-header" data-background-color="purple">
                <md-card-header-text>
                    <div class="md-title">Login</div>
                </md-card-header-text>
            </md-card-header>
            <form @submit.prevent="login">
            <md-card-content>
                <md-field>
                    <label>Email</label>
                    <md-input v-model="email" type="email" />
                </md-field>

                <md-field>
                    <label>Password</label>
                    <md-input v-model="password" type="password" />
                </md-field>
            </md-card-content>
            </form>

            <md-card-actions>
                <md-button class="md-raised md-primary" @click="login">Login</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import { useMainStore } from '../stores/MainStore';
import Notification from '../components/NotificationPlugin/Notification.vue';

export default {
    data() {
        return {
            email: '',
            password: '',

        };
    },
    methods: {
        async login() {
            // Aqui você pode adicionar a lógica de login, como fazer uma solicitação para um servidor
            let form = {
                email: this.email,
                password: this.password
            }

            const mainStore = useMainStore();
            const self = this

            try {
                
                console.log(1)
                await mainStore.login(form)
                self.$router.push('/dashboard');

            } catch (err) {
                
                this.$notify({
                    message: 'Erro ao realizar o login, verifique as credênciais informadas',
                    icon: 'add_alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                })
            }


        },
    },
};
</script>

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.login-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #ffffff;
    position: relative;
}

.login-card-header {
    position: absolute;
    top: -20px;
    /* Ajuste este valor conforme necessário */
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px 8px 0 0;
    background-color: #ffffff;
}

.login-card-header .md-card-header-text {
    display: flex;
    justify-content: center;
    align-items: center;

}

.md-card-header.login-card-header.md-card-header-flex {
    margin-left: auto;
    margin-right: auto;
}

.md-title {
    font-size: 24px;
    font-weight: bold;
}
</style>