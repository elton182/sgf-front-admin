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
            <div class="md-layout md-gutter" :class="`md-alignment-center-center`">
              

              <div class="md-layout-item md-size-25" v-if="company.logo_image_url">
                <img :src="company.logo_image_url" alt="" style="height: 150px;width: 150px;" class="center" >
              </div>

             
            </div>
            <div class="md-layout">

             
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome da Tenant (Banco)</label>
                  <md-input v-model="company.tenant_id" type="text" :disabled="mode == 'edit'"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="company.name" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>E-mail</label>
                  <md-input v-model="company.email" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>CPF/CNPJ</label>
                  <md-input v-model="company.cpfcnpj" required type="text" @input="onInputCPFouCNPJ"
                    maxlength="18"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Inscrição Estadual/RG</label>
                  <md-input v-model="company.ierg" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>CEP</label>
                  <md-input v-model="company.zipcode" type="text" @input="onInputCEP" @blur="buscarEndereco" required
                    maxlength="9"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Cidade</label>
                  <md-input v-model="company.city" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>UF</label>
                  <md-input v-model="company.uf" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Logradouro</label>
                  <md-input v-model="company.address" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Bairro</label>
                  <md-input v-model="company.neighbourhood" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Complemento</label>
                  <md-input v-model="company.complement" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Informações do Cliente</label>
                  <md-input v-model="company.info" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">                

                <md-field>
                  <label>Logo da Empresa</label>
                  <md-file v-model="company.logo_image" id="file"></md-file>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Status</label>

                  <md-select v-model="company.status" name="status" id="status">
                    <md-option value="1">Ativo</md-option>
                    <md-option value="0">Inativo</md-option>
                  </md-select>
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

    if (this.$route.params.id) {
      this.mode = 'edit'

      this.getData(this.$route.params.id)

    }
  },
  methods: {
    async getData(id) {

      try {

        this.company = await Company.getCompany(id)
        console.log(this.company)

      } catch (error) {

      }
    },
    async buscarEndereco() {
      const cepLimpo = this.company.zipcode.replace(/\D/g, '');

      let self = this

      if (cepLimpo.length !== 8) {
        self.company.address = null;
        self.company.city = null;
        self.company.uf = null;
        return;
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (!data.erro) {
          self.company.address = data.logradouro;
          self.company.city = data.localidade;
          self.company.uf = data.uf;
          self.company.neighbourhood = data.bairro
        }
      } catch (error) {
        self.endereco = null;
        console.error('Erro ao buscar o CEP:', error);
      }
    },
    aplicarMascaraCEP(valor) {
      // Remove todos os caracteres não numéricos
      let v = valor.replace(/\D/g, '');

      // Aplica a máscara CEP: 00000-000
      v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');

      return v;
    },
    onInputCEP(value) {
      this.company.zipcode = this.aplicarMascaraCEP(value);
    },
    onInputCPFouCNPJ(value) {
      this.company.cpfcnpj = this.aplicarMascaraCPFouCNPJ(value);
    },
    aplicarMascaraCPFouCNPJ(valor) {
      // Remove todos os caracteres não numéricos
      let v = valor.replace(/\D/g, '');

      if (v.length <= 11) {
        // Máscara CPF: 000.000.000-00
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        // Máscara CNPJ: 00.000.000/0000-00
        v = v.replace(/(\d{2})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1/$2');
        v = v.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }

      return v;
    },
    saveCompany() {
      let self = this

      var formData = new FormData();

      Object.entries(self.company).forEach(([key, value]) => {
        formData.append(key, value);
      });


      var imagefile = document.querySelector('#file');
      formData.append("logo_image", imagefile.files[0]);

      if(self.mode == 'add'){

        Company.addCompany(formData)
          .then(response => {
            self.$router.push('/companys')
          })
      } else {
        Company.updateCompany(formData)
          .then(response => {
            self.$router.push('/companys')
          })
      }

    }
  },
  data() {
    return {
      mode: 'add',
      company: {
        tenant_id: '',
        email: '',
        name: '',
        city: '',
        address: '',
        zipcode: '',
        uf: ''
      }
    }
  }
};
</script>

<style scoped>

.center{
  margin-left: auto;
  margin-right: auto;
  display: block;
}

</style>