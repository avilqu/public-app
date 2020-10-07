<template>
    <div class="col-sm-12">
        <h2>User list</h2>
        <br />
        <app-table
            :items="users"
            :baseLink="'/user/'"
            :cols="[
                { title: 'Name', key: 'name' },
                { title: 'Email', key: 'email' }
            ]"
        ></app-table>
    </div>
</template>

<script>
import { apiClient } from '@/services/apiClient.js';
import Table from '@/components/Utils/Table.vue';

export default {
    data: function() {
        return {
            users: []
        };
    },

    components: { 'app-table': Table },

    methods: {
        async fetchData() {
            this.users = await apiClient.getUserList();
        }
    },

    async created() {
        this.users = await apiClient.getUserList();
    }
};
</script>

<style></style>
