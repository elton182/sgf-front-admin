<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Adicionar Usuário</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <div class="md-layout">

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="user.name" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>E-mail</label>
                  <md-input v-model="user.email" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Senha</label>
                  <md-input v-model="user.password" type="password"></md-input>
                </md-field>
              </div>
              
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="saveUser">Salvar</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import User from "../../apis/User";
import Notification from '@/components/NotificationPlugin/Notification.vue';

export default {
  components: {

  },
  computed: {

  },
  mounted() {

    if(this.$route.params.id){
      this.mode = 'edit'

      this.getData()

    }

  },
  methods: {
    async saveUser(){
      let self = this

      try{
        
        if(this.mode == 'add'){
          await User.addUser(this.user)
          
        } else {

          if(this.user.password == ''){
            delete this.user.password;
          }

          await User.updateUser(this.user)
        }

        this.$notify({
            message: this.mode == 'add' ? 'Sucesso ao cadastrar o usuário': 'Sucesso ao editar o usuário' ,
            icon: 'add_alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
        })
    
        this.$router.push('/admin')
        
      } catch( error) {
        
        this.$notify({
            message: error,
            icon: 'add_alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
        })
      }

      
    },
    async getData(){

      try {
        
        this.user = await User.getUser()

      } catch (error) {
        
      }
    }
  },
  data() {
    return {
      mode: 'add',
      user: {
        email: '',
        name: ''
      }
    }
  }
};
</script>
