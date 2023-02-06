<template>
  <div id="main-app">
    <v-card class="mx-auto overflow-hidden" height="400">
      <v-app>
        <v-main>
          <router-view></router-view>
        </v-main>
      </v-app>
    </v-card>
  </div>
</template>

<script>


export default {
  data: () => ({}),
  components: {
  },
  methods: {
  }
};
</script>

<style>
</style>
