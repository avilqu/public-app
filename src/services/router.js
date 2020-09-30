import UserDetails from './../components/User/UserDetails.vue';
import UserCreate from './../components/User/UserCreate.vue';
import UserList from './../components/User/UserList.vue';
import UserPassword from './../components/User/UserPassword.vue';
import Login from './../components/Login.vue';
import Home from './../components/Home.vue';

export const routes = [
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
        path: '/user/create',
        component: UserCreate
    },
    {
        path: '/user/:id/password/:token',
        component: UserPassword
    },
    {
        path: '/user/:id/verify/:token',
        component: Home,
        props: { verify: true }
    },
    {
        path: '/user/:id',
        component: UserDetails
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/auth',
        component: Home,
        props: { auth: true }
    },
    {
        path: '/',
        component: Home
    }
];
