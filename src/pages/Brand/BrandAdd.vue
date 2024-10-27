
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar Marca</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Nome</label>
          <md-input v-model="brand.name" />
        </md-field>
        
        <md-button @click="saveBrand">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Brand from "../../apis/Brand";

export default {
  methods: {
    async saveBrand() {
      try {
        await Brand.addBrand(this.brand);
        this.$router.push('/brands');
      } catch (error) {
        console.error(error);
      }
    },
  },
  data() {
    return {
      brand: {
        name: '',
        
      },
    };
  }
};
</script>
