import Vue from "vue";
import { createPinia, PiniaVuePlugin  } from 'pinia';
import App from "./App";


// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import VueRouter from "vue-router";

import router from './routes'


Vue.prototype.$Chartist = Chartist;


const pinia = createPinia();

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  pinia,
  data: {
    Chartist: Chartist,
  },
});
