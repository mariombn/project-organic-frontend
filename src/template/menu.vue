<template>
  <v-navigation-drawer v-model="drawer" absolute temporary v-if="this.$store.getters.login">
    <v-list nav dense>
      <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
                {{ this.$store.getters.userAuth.name }}
                {{ this.$store.getters.userAdmin }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ this.$store.getters.userAuth.email }}</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            teste
            <v-switch
              v-model="dark"
              :label="`Switch 1: ${switch1.toString()}`"
            ></v-switch>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item link>
          <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>
      
      <router-link class="router-link" to="/usuarios" v-if="this.$store.getters.userAdmin">
          <v-list-item link>
          <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>
      </router-link>

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
</template>

<script>


export default {
  name: 'Menu',
  data: () => ({
    dark: true
  })
};
</script>