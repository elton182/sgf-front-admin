<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Cadastro de Administradores</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->            
          </md-card-header>
          <md-card-content>
            <md-button class="md-success" @click="addUser">Adicionar Usuário</md-button>
            <md-table :table-header-color="tableHeaderColor" md-sort="id" md-sort-order="asc" v-model="list">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title"></h1>
                 
                </div>
               
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Pesquisar..." v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-row slot="md-table-row" slot-scope="{ item , index}">
                <md-table-cell md-label="Id">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="E-mail">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Ações">
                  <md-button class="md-just-icon md-danger" @click="delUser(item.id, index)"><md-icon>delete</md-icon></md-button>                                   
                </md-table-cell>
                
              </md-table-row>
              <md-table-pagination :md-page-size="rowsPerPage" :md-page-options="[3, 5, 10, 15]"
                :md-update="getList" :md-data.sync="list" >
              </md-table-pagination>

            </md-table>

          </md-card-content>
        </md-card>
      </div>


    </div>
  </div>
</template>

<script>

import User from "../../apis/User";

export default {
  components: {
  
  },
  computed: {
    
  },
  mounted() {
   
    this.getList()
  },
  methods: {
    async delUser(id, index){

      let self = this
      User.delUser(id)
      .then( response => {
        debugger
        
        self.list.splice(index,1)
        
      })
      
    },
    addUser(){
      this.$router.push('/admin/add')
    },  
    getList() {

      console.log('updatePagination')
      User.getList('search=' + this.search)
        .then(response => {
          this.list = response.data.data
          this.rowsPerPage = response.data.per_page
          this.mdCount = response.data.total
          this.mdPage = response.data.current_page
        })
    },
    searchOnTable() {
      this.getList()
    },
  },
  data() {
    return {
      tableHeaderColor: 'green',
      api: User,
      selected: [],
      search: '',
      mdCount: null,
      mdPage: null,
      list: [],
      rowsPerPage: 15
    }
  }
};
</script>


<style scoped>

</style>
