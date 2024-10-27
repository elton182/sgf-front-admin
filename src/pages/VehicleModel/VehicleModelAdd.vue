<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Modelo de Veículo</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome</label>
              <md-input v-model="vehiclemodel.name" />
            </md-field>
          </div>

        </div>

        <md-button @click="saveVehicleModel">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import VehicleModel from "../../apis/VehicleModel";
import Notification from '@/components/NotificationPlugin/Notification.vue';
export default {
  methods: {
    async saveVehicleModel() {
      let self = this
      try {
        await VehicleModel.addVehicleModel(this.vehiclemodel);
        self.$router.push('/vehicle-models');
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
      vehiclemodel: {
        name: '',
      },
    };
  }
};
</script>
