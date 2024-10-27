<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Tipo de Veículo</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome</label>
              <md-input v-model="vehicletype.name" />
            </md-field>
          </div>

        </div>

        <md-button @click="saveVehicleType">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import VehicleType from "../../apis/VehicleType";
import Notification from '@/components/NotificationPlugin/Notification.vue';
export default {
  methods: {
    async saveVehicleType() {
      let self = this
      try {
        await VehicleType.addVehicleType(this.vehicletype);
        self.$router.push('/vehicle-types');
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
  },
  data() {
    return {
      vehicletype: {
        name: '',
        abbreviation: ''
      },
    };
  }
};
</script>
