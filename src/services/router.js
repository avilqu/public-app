import UserDetails from './../components/User/UserDetails.vue';
import UserCreate from './../components/User/UserCreate.vue';
import UserList from './../components/User/UserList.vue';
import UserPassword from './../components/User/UserPassword.vue';
import Login from './../components/Login.vue';
import Home from './../components/Home.vue';

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
        path: '/user/:id/password/:token',
        component: UserPassword
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
