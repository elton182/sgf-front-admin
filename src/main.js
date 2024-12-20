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

import {useMainStore} from '@/stores/MainStore'

const pinia = createPinia();

Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

import { MdField } from 'vue-material/dist/components'
import { MdFile } from 'vue-material/dist/components'

Vue.use(MdField)

Vue.component('MdSelect', Vue.options.components.MdSelect.extend({
    methods: {
        isInvalidValue: function isInvalidValue () {
            return this.$el.validity ? this.$el.validity.badInput : this.$el.querySelector('input').validity.badInput
        }
    }
}))

Vue.component('MdFile', Vue.options.components.MdFile.extend({
  methods: {
      isInvalidValue: function isInvalidValue () {
          return this.$el.validity ? this.$el.validity.badInput : this.$el.querySelector('input').validity.badInput
      }
  }
}))


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

const mainStore = useMainStore()

mainStore.init()
