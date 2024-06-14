<template>
  <div class="main-content">


    <dashboard-content> </dashboard-content>

    <content-footer v-if="!$route.meta.hideFooter"></content-footer>


  </div>
</template>

<script>

import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";


export default {
  components: {

    DashboardContent,
    ContentFooter
  },
  data() {
    return {

    };
  },
};
</script>
