import Vue from 'vue';
import App from '@/App.vue';
import Router from 'vue-router';
import VueCookies from 'vue-cookies';
import { routes } from '@/services/router.js';
import './../src/assets/css/bootstrap.min.css';
import 'bootstrap';

Vue.use(VueCookies);
Vue.use(Router);
Vue.config.productionTip = false;

const router = new Router({
    routes,
    mode: 'history'
});

new Vue({
    router,
    render: function(h) {
        return h(App);
    }
}).$mount('#app');
