<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Adicionar Grupo</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <div class="md-layout">

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="group.name" type="text"></md-input>
                </md-field>
              </div>          
              
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="saveGroup">Salvar</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import CompanyGroup from "@/apis/CompanyGroup";
import Notification from '@/components/NotificationPlugin/Notification.vue';

export default {
  components: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    async saveGroup(){
      let self = this

      try{
        
        this.group.tenant = this.$route.params.id
        await CompanyGroup.addGroup(this.group)

        this.$notify({
            message: 'Sucesso ao cadastrar o usuário',
            icon: 'add_alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
        })
    
        this.$router.go(-1)

        
      } catch( error) {
        
        this.$notify({
            message: error,
            icon: 'add_alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
        })
      }

      
    }
  },
  data() {
    return {
      group: {
        name: '',
        tenant: ''
      }
    }
  }
};
</script>
