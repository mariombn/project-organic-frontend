<template>
  <div>
    <v-app-bar app color="header" dark>
        <v-app-bar-nav-icon @click="drawer = true" v-if="this.$store.getters.login"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
          <router-link to="/">
              <v-img
                  alt="Logo Via Varejo"
                  class="shrink mr-2"
                  contain
                  src="/logo.png"
                  transition="scale-transition"
                  width="450"
              />
          </router-link>
        </div>

        <v-spacer></v-spacer>

        <v-btn @click="logoff" v-if="this.$store.getters.login">
          <span class="mr-2">SAIR</span>
        <v-icon>exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary v-if="this.$store.getters.login">
      <v-list nav dense>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ this.$store.getters.userAuth.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ this.$store.getters.userAuth.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>
        <router-link class="router-link" to="/usuarios" v-if="this.$store.getters.userAdmin">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link class="router-link" to="/produtos">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>


export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    logoff: function () {
      this.$store.commit('logoff');
      this.$router.push('login');
    }
  }
};
</script>