<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }" v-if="isLoaded">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin">
        <md-icon>person</md-icon>
        <p>Administradores</p>
      </sidebar-link>
      <sidebar-link to="/companys">
        <md-icon>business</md-icon>
        <p>Empresas</p>
      </sidebar-link>
      <sidebar-link to="/routines">
        <md-icon>task</md-icon>
        <p>Rotinas</p>
      </sidebar-link>
    
      
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>

import { useMainStore } from "@/stores/MainStore";

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  setup(){
    const mainStore = useMainStore()

    return {mainStore}
  },
  computed: {
    isLoaded(){
      return this.mainStore.getLoaded
    }
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
};
</script>
