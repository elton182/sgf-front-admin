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

            <div class="md-layout md-gutter md-alignment-center-center">

              <div class="md-layout-item   ">

                <img :src="company.logo_image_url" alt="" style="width: 100px" class="logo-image">
              </div>    
            </div>
            <div class="md-layout ">
                                   
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Tenant</label>
                  <md-input v-model="company.tenant_id" type="text" disabled></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome da Empresa</label>
                  <md-input v-model="company.name" type="text" ></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">                
                <md-field>
                  <label>Logo da Empresa</label>
                  <md-file v-model="logo_image" id="file"></md-file>
                </md-field>
              </div>

              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="updateCompany">Salvar</md-button>
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
    this.getCompany()
  },
  methods: {
    changeFile(list){
      console.log(list)
    },
    async updateCompany(){
      let self = this

      var formData = new FormData();

      formData.append("tenant_id", self.company.tenant_id);
      formData.append("name", self.company.name);

      var imagefile = document.querySelector('#file');
      formData.append("logo_image", imagefile.files[0]);

      await Company.updateCompany(formData)
      .then( response => {
        self.$router.push('/companys')
      } )
    },
    async getCompany(){
      let id = this.$route.params.id
      this.company = await Company.getCompany(id)
      
    }
  },
  data() {
    return {
      logo_image: null,
      company: {
        name: '',
        logo_image_url: ''
      }
    }
  }
};
</script>
<style scoped>

.logo-image{
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 20px;
}

</style>