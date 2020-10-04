import Login from '@/components/Auth/Login.vue';
import PasswordReset from '@/components/Auth/PasswordReset.vue';
import UserDetails from '@/components/User/UserDetails.vue';
import UserList from '@/components/User/UserList.vue';
import Home from '@/components/Home.vue';

export const routes = [
    // Authentication routes
    {
        path: '/login',
        component: Login
    },

    {
        path: '/auth',
        component: Login,
        props: { auth: true }
    },

    {
        path: '/verify/:id/:token',
        component: Login,
        props: { verify: true }
    },

    {
        path: '/reset-password/:id/:token',
        component: PasswordReset
    },

    // App routes
    {
        path: '/user',
        name: 'userDetails',
        component: UserDetails,
        props: true
    },

    {
        path: '/user/list',
        component: UserList
    },

    {
        path: '/user/:id',
        component: UserDetails
    },

    // Global routes
    {
        path: '*',
        component: Home
    }
];
