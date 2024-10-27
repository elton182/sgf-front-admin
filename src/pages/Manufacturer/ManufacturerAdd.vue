<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Fabricante</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome</label>
              <md-input v-model="manufacturer.name" />
            </md-field>
          </div>


          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Abreviação</label>
              <md-input v-model="manufacturer.abbreviation" maxlength="2"/>
            </md-field>
          </div>
        </div>

        <md-button @click="saveManufacturer">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Manufacturer from "../../apis/Manufacturer";
import Notification from '@/components/NotificationPlugin/Notification.vue';
export default {
  methods: {
    async saveManufacturer() {
      try {
        await Manufacturer.addManufacturer(this.manufacturer);
        this.$router.push('/manufacturers');
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
      manufacturer: {
        name: '',
        abbreviation: ''
      },
    };
  }
};
</script>
