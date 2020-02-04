<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span class="title ml-3 mr-5">深圳疫情地图&nbsp;<span class="font-weight-light">nCOV</span></span>
      <v-spacer />

    </v-app-bar>

    <v-content>
      <v-map />
    </v-content>
  </v-app>
</template>

<script>
import VMap from './components/VMap';

export default {
  name: 'App',

  components: {
    VMap,
  },

  data: () => ({
    //
  }),
};
</script>
