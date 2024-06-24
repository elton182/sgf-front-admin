<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Grupos da Empresa: {{ $route.params.id }}</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <md-button class="md-success" @click="addGroup">Adicionar Grupo</md-button>
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
                <md-table-cell md-label="Ações">
                  <md-button class="md-just-icon md-danger" @click="delGroup(item.id, index)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Deletar Grupo</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-info" @click="managePermissions(item.id, index)">
                    <md-icon>lock_open</md-icon>
                    <md-tooltip md-direction="top">Permissões do Grupo</md-tooltip>
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
        <md-dialog-title>Permissões do Grupo</md-dialog-title>

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
                    <div class="md-title">Permissões Disponíveis</div>
                  </md-card-header-text>
                </md-card-header>
                <md-card-content>
                  <md-list>
                    <md-list-item v-for="(availablePermission, index) in getAvailablePermissions" :key="index">
                      {{ availablePermission.name }}
                      <md-button class="md-icon-button" @click="assignPermission(availablePermission)">
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
                    <md-list-item v-for="(assignedPermission, index) in assignedPermissions" :key="index">
                      {{ assignedPermission.routine.name }}
                      <md-button class="md-icon-button" @click="removePermission(assignedPermission)">
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

import CompanyGroup from "../../apis/CompanyGroup";
import CompanyPermission from "../../apis/CompanyPermission";
import Notification from '@/components/NotificationPlugin/Notification.vue';

export default {
  components: {

  },
  computed: {
    getAvailablePermissions() {
      return this.availablePermissions.filter(permission =>
        !this.assignedPermissions.some(assignedPermission => assignedPermission.routine_id === permission.id)
      );
    }
  },
  mounted() {

    this.getList()
    this.getPermissions()
  },
  methods: {
    async removePermission(assignedPermission) {

      try {

        let tenant = this.$route.params.id
        await CompanyPermission.delPermissiocnGroup(tenant, assignedPermission.id);
        await this.getPermissions()
        await this.getGroupPermission(this.currentGroupId)

        this.$notify({
          message: 'Permissão removida com sucesso',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (error) {

      }
    },
    async assignPermission(permission) {

      let tenant = this.$route.params.id

      let data = {
        group_id: this.currentGroupId,
        routine_id: permission.id,
        tenant: tenant
      }

      try {

        await CompanyPermission.addPermissionGroup(data);
        await this.getPermissions()
        await this.getGroupPermission(this.currentGroupId)
        this.$notify({
          message: 'Permissão atribuída com sucesso',
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (error) {

      }
    },
    async getPermissions(id, index) {
      try {
        this.loading = true
        let tenant = this.$route.params.id
        this.availablePermissions = await CompanyPermission.getSimpleList(tenant)
        this.loading = false
      } catch (error) {

      }
    },
    async managePermissions(id, index) {

      this.currentGroupId = id
      await this.getGroupPermission(id)
      this.showDialog = true
    },
    async getGroupPermission(id) {
      try {
        this.loading = true
        let tenant = this.$route.params.id
        this.assignedPermissions = await CompanyPermission.getGroupPermission(tenant, id)

        this.loading = false
      } catch (error) {

      }
    },

    async delGroup(id, index) {

      let self = this

      try {

        let tenant = this.$route.params.id

        await CompanyGroup.delGroup(id, tenant)
        self.list.splice(index, 1)
      } catch (error) {

      }


    },
    addGroup() {
      this.$router.push(`/company/groups/${this.$route.params.id}/add`)
    },
    getList() {


      CompanyGroup.getList(this.$route.params.id, 'search=' + this.search)
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
      api: CompanyGroup,
      selected: [],
      search: '',
      mdCount: null,
      mdPage: null,
      list: [],
      rowsPerPage: 15,
      currentGroupId: 0,
      showDialog: false,
      loading: false,
      availablePermissions: [],
      assignedPermissions: [],
    }
  }
};
</script>


<style scoped></style>
