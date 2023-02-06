import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';
import DatetimePicker from 'vuetify-datetime-picker'
import router from '@/router';

Vue.use(Vuex);
Vue.use(DatetimePicker)
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  plugins: [createPersistedState()],
});

const publicPages = ['/login', '/'];

router.beforeEach((to, from, next) => {
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.login;

  if (authRequired && !loggedIn) {
    //next('/');
    next();
  } else {
    next();
  }
})

new Vue({
  router,
  store: store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
