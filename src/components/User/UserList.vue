<template>
    <div class="col-sm-12" v-if="user.role >= 4">
        <h2>User list</h2>
        <br />
        <router-link
            tag="button"
            :to="'/user/create'"
            type="button"
            class="btn btn-outline-success"
        >
            Add user
        </router-link>
        <br />
        <br />
        <table class="table table-hover">
            <thead>
                <tr class="__tableHead">
                    <th scope="col" @click="sortBy('name')">Name</th>
                    <th scope="col" @click="sortBy('email')">Email</th>
                    <th scope="col">
                        <select
                            id="type"
                            class="form-control-sm"
                            v-model="filters.role"
                            @click="filterList()"
                        >
                            <option value="0">Role</option>
                            <option value="1">Guide</option>
                            <option value="2">Opsleader</option>
                            <option value="3">Maintenance</option>
                            <option value="4">Admin</option>
                        </select>
                    </th>
                    <th scope="col" @click="sortBy('added')">Added</th>
                </tr>
            </thead>
            <tbody>
                <router-link
                    tag="tr"
                    v-for="user in filteredUsers"
                    :key="user._id"
                    :class="{ __unverified: !user.verified }"
                    :to="'/user/' + user._id"
                >
                    <!-- :to="{ path:'/user/' + user._id }"-->
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ new Date(user.added).toDateString() }}</td>
                </router-link>
            </tbody>
        </table>
    </div>
</template>

<script>
import { userClient } from './../../services/userClient.js';

export default {
    data: function() {
        return {
            users: [],
            filteredUsers: [],
            filters: {
                role: 0,
                name: 1,
                email: 1,
                added: 1
            }
        };
    },
    props: {
        user: {}
    },
    methods: {
        filterList() {
            this.filteredUsers = this.users.filter((user) => {
                if (Number(this.filters.role) === 0) return true;
                else return user.role === Number(this.filters.role);
            });
        },
        sortBy(prop) {
            this.filteredUsers.sort((a, b) =>
                a[prop] > b[prop] ? this.filters[prop] : -this.filters[prop]
            );
            this.filters[prop] = -this.filters[prop];
        }
    },
    async created() {
        this.users = await userClient.getUserList();
        this.filterList();
    }
};
</script>

<style scoped>
@import './../../assets/css/list.css';
</style>
