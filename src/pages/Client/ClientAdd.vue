<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Adicionar Cliente</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <div class="md-layout">

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="client.name" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>E-mail</label>
                  <md-input v-model="client.email" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>CPF/CNPJ</label>
                  <md-input v-model="client.cpfcnpj" required type="text" @input="onInputCPFouCNPJ"
                    maxlength="18"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Inscrição Estadual/RG</label>
                  <md-input v-model="client.ierg" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>CEP</label>
                  <md-input v-model="client.zipcode" type="text" @input="onInputCEP" @blur="buscarEndereco" required
                    maxlength="9"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Cidade</label>
                  <md-input v-model="client.city" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>UF</label>
                  <md-input v-model="client.uf" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Logradouro</label>
                  <md-input v-model="client.address" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Bairro</label>
                  <md-input v-model="client.neighbourhood" required type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Complemento</label>
                  <md-input v-model="client.complement" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Informações do Cliente</label>
                  <md-input v-model="client.info" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Status</label>

                  <md-select v-model="client.status">
                    <md-option value="1">Ativo</md-option>
                    <md-option value="0">Inativo</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Empresa/Tenant</label>

                  <md-select v-model="client.tenant_id">

                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="saveClient">Salvar</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import Client from "../../apis/Client";
import Notification from '@/components/NotificationPlugin/Notification.vue';

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
    async buscarEndereco() {
      const cepLimpo = this.client.zipcode.replace(/\D/g, '');

      let self = this

      if (cepLimpo.length !== 8) {
        self.client.address = null;
        self.client.city = null;
        self.client.uf = null;
        return;
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (!data.erro) {    
          self.client.address = data.logradouro;
          self.client.city = data.localidade;
          self.client.uf = data.uf;
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
      this.client.zipcode = this.aplicarMascaraCEP(value);
    },
    onInputCPFouCNPJ(value) {
      this.client.cpfcnpj = this.aplicarMascaraCPFouCNPJ(value);
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


    async saveClient() {
      let self = this

      try {

        if (this.mode == 'add') {
          await Client.addClient(this.client)

        } else {
        
          await Client.updateClient(this.client)
        }

        this.$notify({
          message: this.mode == 'add' ? 'Sucesso ao cadastrar o cliente' : 'Sucesso ao editar o cliente',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })

        this.$router.push('/clients')

      } catch (error) {

        this.$notify({
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

        this.client = await Client.getClient(id)
        console.log(this.client)

      } catch (error) {

      }
    }
  },
  data() {
    return {
      mode: 'add',
      client: {
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
