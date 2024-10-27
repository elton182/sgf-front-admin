const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

// Caminhos base
const PAGES_PATH = path.join(__dirname, 'src', 'pages');
const ROUTES_PATH = path.join(__dirname, 'src', 'routes', 'routes.js');
const SERVICE_PATH = path.join(__dirname, 'src', 'apis');

// Template do componente de lista
const listTemplate = (entity, label) => `
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Cadastro de ${label}s</h4>
      </md-card-header>
      <md-card-content>
        <md-button class="md-success" @click="add${entity}">Adicionar ${label}</md-button>
        <md-table :table-header-color="tableHeaderColor" md-sort="id" md-sort-order="asc" v-model="list">
          <md-table-toolbar>
            <md-field md-clearable>
              <md-input placeholder="Pesquisar..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item, index }">
            <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Ações">
              <md-button @click="edit${entity}(item.id, index)">Editar</md-button>
              <md-button @click="del${entity}(item.id, index)">Excluir</md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import ${entity} from "../../apis/${entity}";

export default {
  mounted() {
    this.getList();
  },
  methods: {
    async add${entity}() {
      this.$router.push('/${entity.toLowerCase()}s/add');
    },
    async edit${entity}(id, index) {
      this.$router.push(\`/${entity.toLowerCase()}s/edit/\${id}\`);
    },
    async del${entity}(id, index) {
      try {
        await ${entity}.del${entity}(id);
        this.list.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
    getList() {
      ${entity}.getList().then(response => {
        this.list = response.data;
      });
    },
  },
  data() {
    return {
      list: [],
      search: '',
    };
  }
};
</script>
`;

// Template do componente de adição
const addTemplate = (entity, label) => `
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Adicionar ${label}</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Nome</label>
          <md-input v-model="${entity.toLowerCase()}.name" />
        </md-field>
        
        <md-button @click="save${entity}">Salvar</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import ${entity} from "../../apis/${entity}";

export default {
  methods: {
    async save${entity}() {
      try {
        await ${entity}.add${entity}(this.${entity.toLowerCase()});
        this.$router.push('/${entity.toLowerCase()}s');
      } catch (error) {
        console.error(error);
      }
    },
  },
  data() {
    return {
      ${entity.toLowerCase()}: {
        name: '',
        
      },
    };
  }
};
</script>
`;

// Função para gerar os arquivos e rotas
async function generateCrud(entity, label) {
  const entityLower = entity.toLowerCase();
  const entityPath = path.join(PAGES_PATH, entityLower);

  // Cria a pasta e os componentes
  await fs.ensureDir(entityPath);
  await fs.writeFile(path.join(entityPath, `${entity}List.vue`), listTemplate(entity, label));
  await fs.writeFile(path.join(entityPath, `${entity}Add.vue`), addTemplate(entity, label));

  // Cria o serviço da API
  await fs.writeFile(
    path.join(SERVICE_PATH, `${entity}.js`),
    `import Api from './Api';\nexport default { getList: () => Api.get('/${entityLower}s'), add${entity}: data => Api.post('/${entityLower}s', data), del${entity}: id => Api.delete(\`/${entityLower}s/\${id}\`) };`
  );

  // Adiciona rotas no routes.js
  const routeEntry = `
  {
    path: '${entityLower}s',
    name: 'Lista de ${label}s',
    component: () => import('../pages/${entityLower}/${entity}List.vue'),
  },
  {
    path: '${entityLower}s/add',
    name: 'Adicionar ${label}',
    component: () => import('../pages/${entityLower}/${entity}Add.vue'),
  },`;

  await fs.appendFile(ROUTES_PATH, routeEntry);
  console.log(`CRUD para ${label} criado com sucesso!`);
}

// Função principal interativa
async function main() {
  const answers = await inquirer.prompt([
    { name: 'entity', message: 'Nome da entidade (em inglês):' },
    { name: 'label', message: 'Label da entidade (em português):' },
  ]);

  await generateCrud(answers.entity, answers.label);
}

// Executa o script
main().catch(console.error);
