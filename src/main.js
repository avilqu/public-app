import Vue from 'vue';
import App from '@/App.vue';
import VueCookies from 'vue-cookies';

import { router } from '@/services/router.js';
import { store } from '@/store/store.js';
import './../src/assets/css/bootstrap.min.css';
import 'bootstrap';

Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    }
}).$mount('#app');
