import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginLayout from "@/pages/Layout/LoginLayout.vue"

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue"

import CompanyList from "@/pages/Company/CompanyList.vue";
import CompanyAdd from "@/pages/Company/CompanyAdd.vue";
import CompanyEdit from "@/pages/Company/CompanyEdit.vue";

import CompanyUserList from "@/pages/Company/CompanyUserList.vue";
import CompanyUserAdd from "@/pages/Company/CompanyUserAdd.vue";

import CompanyGroupList from "@/pages/Company/CompanyGroupList.vue";
import CompanyGroupAdd from "@/pages/Company/CompanyGroupAdd.vue";

import RoutineList from "../pages/Routines/RoutineList.vue";
import RoutineAdd from "../pages/Routines/RoutineAdd.vue";

import AdminList from "@/pages/Admin/AdminList.vue";
import AdminAdd from "@/pages/Admin/AdminAdd.vue";

const routes = [
  {
    path: "/",
    component: LoginLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: { guestOnly: true }
      }
    ]
  },
  {
    path: "/logout",
    component: LoginLayout,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: { guestOnly: true }
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { authOnly: true },
    children: [

      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "companys",
        name: "Empresas",
        component: CompanyList,
      },
      {
        path: "company/users/:id",
        name: "Usuários da Empresa",
        component: CompanyUserList,
      },  
      {
        path: "company/groups/:id",
        name: "Grupos da Empresa",
        component: CompanyGroupList,
      },    
      {
        path: "company/users/:id/add",
        name: "Adicionar Usuários na Empresa",
        component: CompanyUserAdd,
      },  
      {
        path: "company/groups/:id/add",
        name: "Adicionar Grupos na Empresa",
        component: CompanyGroupAdd,
      },  
      {
        path: "company/add",
        name: "Adicionar Empresas",
        component: CompanyAdd,
      },
      {
        path: "company/edit/:id",
        name: "Editar Informações da Empresa",
        component: CompanyEdit,
      },
      {
        path: "admin",
        name: "Admin",
        component: AdminList,
      },
      {
        path: "admin/add",
        name: "Adicionar Admin",
        component: AdminAdd,
      },
      {
        path: "admin/edit/:id",
        name: "Editar Admin",
        component: AdminAdd,
      },
      {
        path: "routines",
        name: "Rotinas",
        component: RoutineList,
      },
      {
        path: "routine/add",
        name: "Adicionar Rotina",
        component: RoutineAdd,
      },
      {
        path: "routine/edit/:id",
        name: "Adicionar Rotina",
        component: RoutineAdd,
      },
      
    ],
  },
];

export default routes;
