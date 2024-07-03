<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Adicionar Rotina</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <div class="md-layout">

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="routine.name" type="text"></md-input>
                </md-field>

              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Caminho(path)</label>
                  <md-input v-model="routine.path" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="saveRoutine">Salvar</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import Routine from "@/apis/Routine";
import Notification from '@/components/NotificationPlugin/Notification.vue';

export default {
  components: {

  },
  computed: {

  },
  mounted() {
    if (this.$route.params.id) {
      this.mode = 'edit'

      this.getData()

    }
  },
  methods: {
    async getData() {

      try {

        this.routine = await Routine.getRoutine(this.$route.params.id)

      } catch (error) {

      }
    },
    async saveRoutine() {
      let self = this

      try {

        if (this.mode == 'add') {
          await Routine.addRoutine(this.routine)

        } else {

          await Routine.updateRoutine(this.routine)
        }

        this.$notify({
          message: this.mode == 'add' ? 'Sucesso ao cadastrar a rotina' : 'Sucesso ao atualizar a rotina',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })

        this.$router.go(-1)


      } catch (error) {

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
      mode: 'add',
      routine: {
        name: ''
      }
    }
  }
};
</script>
