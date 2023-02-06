import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = process.env.VUE_APP_API;

Vue.use(VueAxios, axios)

export default new VueAxios({
});
