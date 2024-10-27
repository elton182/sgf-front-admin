<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Tipo de Evento</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
         
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Type</label>
              <md-input v-model="eventtype.type" />
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Descrição</label>
              <md-textarea v-model="eventtype.description" />
            </md-field>
          </div>

        </div>

        <md-button @click="saveEventType">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import EventType from "../../apis/EventType";
import Notification from '@/components/NotificationPlugin/Notification.vue';
export default {
  mounted() {

    if (this.$route.params.id) {
      this.mode = 'edit'

      this.getData(this.$route.params.id)

    }
  },
  methods: {
    async saveEventType() {
      let self = this
      try {

        if(self.mode =='add'){
          await EventType.addEventType(this.eventtype);
        } else {
          await EventType.updateEventType(this.eventtype);
        }
        self.$router.push('/event-types');
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

        this.eventtype = await EventType.getEventType(id)
        console.log(this.eventtype)

      } catch (error) {

      }
    }
  },
  data() {
    return {
      eventtype: {    
        description: '',
        type: ''
      },
    };
  }
};
</script>
