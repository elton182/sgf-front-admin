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

import ClientList from "../pages/Client/ClientList.vue";
import ClientAdd from "../pages/Client/ClientAdd.vue";

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
        component: CompanyAdd,
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
      {
        path: "clients",
        name: "Lista de Clientes",
        component: ClientList
      },
      {
        path: "clients/add",
        name: "Adicionar Cliente",
        component: ClientAdd
      },
      {
        path: "clients/edit/:id",
        name: "Editar Cliente",
        component: ClientAdd,
      },
      {
        path: 'brands',
        name: 'Lista de Marcas',
        component: () => import('../pages/Brand/BrandList.vue'),
      },
      {
        path: 'brands/add',
        name: 'Adicionar Marca',
        component: () => import('../pages/Brand/BrandAdd.vue'),
      },
      {
        path: 'manufacturers',
        name: 'Lista de Marcas',
        component: () => import('../pages/Manufacturer/ManufacturerList.vue'),
      },
      {
        path: 'manufacturers/add',
        name: 'Adicionar Marca',
        component: () => import('../pages/Manufacturer/ManufacturerAdd.vue'),
      },
      {
        path: 'vehicle-types',
        name: 'Lista de Tipos de Veículos',
        component: () => import('../pages/VehicleType/VehicleTypeList.vue'),
      },
      {
        path: 'vehicle-types/add',
        name: 'Adicionar Tipo Veículo',
        component: () => import('../pages/VehicleType/VehicleTypeAdd.vue'),
      },
      {
        path: 'vehicle-models',
        name: 'Lista de Modelos de Veículos',
        component: () => import('../pages/VehicleModel/VehicleModelList.vue'),
      },
      {
        path: 'vehicle-models/add',
        name: 'Adicionar Modelo de Veículo',
        component: () => import('../pages/VehicleModel/VehicleModelAdd.vue'),
      },
      {
        path: 'event-types',
        name: 'Lista de Tipos de Eventos',
        component: () => import('../pages/EventType/EventTypeList.vue'),
      },
      {
        path: 'event-types/add',
        name: 'Tipos de Eventos',
        component: () => import('../pages/EventType/EventTypeAdd.vue'),
      },
      {
        path: 'event-types/edit/:id',
        name: 'Editar Eventos',
        component: () => import('../pages/EventType/EventTypeAdd.vue'),
      },
      {
        path: 'platforms',
        name: 'Lista de Plataformas',
        component: () => import('../pages/Platform/PlatformList.vue'),
      },
      {
        path: 'platforms/add',
        name: 'Adicionar Plataforma',
        component: () => import('../pages/Platform/PlatformAdd.vue'),
      },
      {
        path: 'platforms/edit/:id',
        name: 'Adicionar Plataforma',
        component: () => import('../pages/Platform/PlatformAdd.vue'),
      },
    ],
  },
];

export default routes;


  