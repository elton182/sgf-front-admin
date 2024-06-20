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
        path: "company/add",
        name: "Adicionar Empresas",
        component: CompanyAdd,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      }
    ],
  },
];

export default routes;
