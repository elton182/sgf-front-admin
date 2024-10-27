<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Cadastro de Tipo de Veículos</h4>
          </md-card-header>
          <md-card-content>
            <md-button class="md-success" @click="addVehicleType">Adicionar Tipo de Veículo</md-button>
            <md-table :table-header-color="tableHeaderColor" md-sort="id" md-sort-order="asc" v-model="list">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title"></h1>

                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Pesquisar..." v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Ações">
                  <md-button class="md-just-icon md-warning"
                    @click="editVehicleType(item.id, index)"><md-icon>edit</md-icon></md-button>
                  <md-button class="md-just-icon md-danger"
                    @click="delVehicleType(item.id, index)"><md-icon>delete</md-icon></md-button>
                </md-table-cell>
              </md-table-row>
              <md-table-pagination :md-page-size="rowsPerPage" :md-page-options="[3, 5, 10, 15]" :md-update="getList"
                :md-data.sync="list">
              </md-table-pagination>

            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleType from "../../apis/VehicleType";

export default {
  mounted() {
    this.getList();
  },
  methods: {

    searchOnTable() {
      this.getList()
    },
    async addVehicleType() {
      this.$router.push('/vehicle-types/add');
    },
    async editVehicleType(id, index) {
      this.$router.push(`/vehicle-types/edit/${id}`);
    },
    async delVehicleType(id, index) {
      try {
        await VehicleType.delVehicleType(id);
        this.list.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
    getList() {
      VehicleType.getList('search=' + this.search).then(response => {
        this.list = response.data.data
        this.rowsPerPage = response.data.per_page
        this.mdCount = response.data.total
        this.mdPage = response.data.current_page
      });


    },
  },
  data() {
    return {
      tableHeaderColor: 'green',
      api: VehicleType,
      selected: [],
      search: '',
      mdCount: null,
      mdPage: null,
      list: [],
      rowsPerPage: 15
    };
  }
};
</script>
