import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '@/store/modules/auth.js';
import { alert } from '@/store/modules/alert.js';
import { user } from '@/store/modules/user.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    modules: {
        auth,
        alert,
        user
    }
});
