import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '@/store/modules/auth.js';
import { alert } from '@/store/modules/alert.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        alert
    }
});
