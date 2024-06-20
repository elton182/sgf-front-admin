<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Cadastro de Empresas</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <div class="md-layout">

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome da Empresa</label>
                  <md-input v-model="company.name" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="saveCompany">Salvar</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import Company from "../../apis/Company";

export default {
  components: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    saveCompany(){
      Company.addCompany(this.company.name)
    }
  },
  data() {
    return {
      company: {
        name: ''
      }
    }
  }
};
</script>
