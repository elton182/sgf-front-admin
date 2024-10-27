<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Plataforma</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
            
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Descrição</label>
              <md-textarea v-model="platform.description" />
            </md-field>
          </div>

        </div>

        <md-button @click="savePlatform">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Platform from "../../apis/Platform";
import Notification from '@/components/NotificationPlugin/Notification.vue';
export default {
  mounted() {

    if (this.$route.params.id) {
      console.log('edit')
      this.mode = 'edit'

      this.getData(this.$route.params.id)

    }
  },
  methods: {
    async savePlatform() {
      let self = this
      try {

        if(self.mode == 'add'){
          await Platform.addPlatform(this.platform);
        } else {
          await Platform.updatePlatform(this.platform);
        }
        self.$router.push('/platforms');
      } catch (error) {
        console.error(error);

        self.$notify({
          message: error,
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
    },
    async getData(id) {

      try {

        this.platform = await Platform.getPlatform(id)
        console.log(this.platform)

      } catch (error) {

      }
    }
  },
  data() {
    return {
      mode: 'add',
      platform: {    
        description: ''
      },
    };
  }
};
</script>
