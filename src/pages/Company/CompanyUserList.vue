<template>
  <div class="content">
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>

          <md-card-header data-background-color="green">
            <h4 class="title">Usuários da Empresa: {{ $route.params.id }}</h4>
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
                  <md-button class="md-just-icon md-danger" @click="delUser(item.id, index)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Deletar Usuário</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-info" @click="manageGroups(item.id, index)">
                    <md-icon>groups</md-icon>
                    <md-tooltip md-direction="top">Grupos do Usuário</md-tooltip>
                  </md-button>
                </md-table-cell>

              </md-table-row>
              <md-table-pagination :md-page-size="rowsPerPage" :md-page-options="[3, 5, 10, 15]" :md-update="getList"
                :md-data.sync="list">
              </md-table-pagination>

            </md-table>

          </md-card-content>
        </md-card>
      </div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Grupos do Usuário</md-dialog-title>

        <md-dialog-content>
          <div class="md-layout md-gutter md-alignment-center-center" v-if="loading">
            <div class="md-layout-item md-size-10">
              <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-card>
                <md-card-header data-background-color="green">
                  <md-card-header-text>
                    <div class="md-title">Grupos Disponíveis</div>
                  </md-card-header-text>
                </md-card-header>
                <md-card-content>
                  <md-list>
                    <md-list-item v-for="(availableGroup, index) in getAvailableGroups" :key="index">
                      {{ availableGroup.name }}
                      <md-button class="md-icon-button" @click="assignGroup(availableGroup)">
                        <md-icon>add</md-icon>
                      </md-button>
                    </md-list-item>
                  </md-list>
                </md-card-content>
              </md-card>
            </div>

            <div class="md-layout-item">
              <md-card>
                <md-card-header data-background-color="blue">
                  <md-card-header-text>
                    <div class="md-title">Grupos Atribuídos</div>
                  </md-card-header-text>
                </md-card-header>
                <md-card-content>
                  <md-list>
                    <md-list-item v-for="(assignedGroup, index) in assignedGroups" :key="index">
                      {{ assignedGroup.group.name }}
                      <md-button class="md-icon-button" @click="removeGroup(assignedGroup)">
                        <md-icon>remove</md-icon>
                      </md-button>
                    </md-list-item>
                  </md-list>
                </md-card-content>
              </md-card>
            </div>
          </div>




        </md-dialog-content>


        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Fechar</md-button>
          <!-- <md-button class="md-primary" @click="showDialog = false">Save</md-button> -->
        </md-dialog-actions>
      </md-dialog>


    </div>
  </div>
</template>

<script>
import CompanyGroup from '../../apis/CompanyGroup';
import CompanyUser from "../../apis/CompanyUser";
import Notification from '@/components/NotificationPlugin/Notification.vue';

export default {
  components: {

  },
  computed: {
    getAvailableGroups() {
      return this.availableGroups.filter(group =>
        !this.assignedGroups.some(assignedGroup => assignedGroup.group_id === group.id)
      );
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.getList()
    this.getGroups()
  },
  methods: {
    async assignGroup(group) {

      let tenant = this.$route.params.id

      let data = {
        group_id: group.id,
        user_id: this.currentUserId,
        tenant: tenant
      }

      try {

        await CompanyGroup.addUserGroup(data);
        await this.getGroups()
        await this.getUserGroups(this.currentUserId)
        this.$notify({
          message: 'Grupo atribuído com sucesso',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (error) {

      }

    },
    async removeGroup(group) {

      try {

        let tenant = this.$route.params.id
        await CompanyGroup.delUserGroup(tenant, group.id);
        await this.getGroups()
        await this.getUserGroups(this.currentUserId)

        this.$notify({
          message: 'Grupo removido com sucesso',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (error) {

      }

    },
    async manageGroups(id, index) {

      this.currentUserId = id
      await this.getUserGroups(id)
      this.showDialog = true
    },
    async getUserGroups(id) {
      try {
        this.loading = true
        let tenant = this.$route.params.id
        this.assignedGroups = await CompanyGroup.getGroupUser(tenant, id)

        this.loading = false
      } catch (error) {

      }
    },
    async getGroups(id, index) {
      try {
        this.loading = true
        let tenant = this.$route.params.id
        this.availableGroups = await CompanyGroup.getSimpleList(tenant)
        this.loading = false
      } catch (error) {

      }
    },
    async delUser(id, index) {

      let self = this

      try {

        let tenant = this.$route.params.id

        await CompanyUser.delUser(id, tenant)
        self.list.splice(index, 1)

        this.$notify({
          message: 'Usuário removido com sucesso',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (error) {

      }


    },
    addUser() {
      this.$router.push(`/company/users/${this.$route.params.id}/add`)
    },
    getList() {

      console.log('updatePagination')
      CompanyUser.getList(this.$route.params.id, 'search=' + this.search)
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
      api: CompanyUser,
      selected: [],
      search: '',
      mdCount: null,
      mdPage: null,
      list: [],
      rowsPerPage: 15,
      showDialog: false,
      availableGroups: [],
      assignedGroups: [],
      currentUserId: 0,
      loading: false
    }
  }
};
</script>


<style>
.md-dialog-container {
  width: 80% !important;
}
</style>
