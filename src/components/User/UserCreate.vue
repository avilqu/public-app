<template>
    <div class="col-sm-12">
        <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal text-center">
                Create a user
            </h1>
            <br />
            <label for="inputName" class="">Name</label>
            <input
                type="text"
                id="userName"
                class="form-control bg-dark text-light"
                required
                autofocus
                v-model="newUser.name"
            />
            <br />
            <label for="inputEmail" class="">Email</label>
            <input
                type="text"
                id="email"
                class="form-control bg-dark text-light"
                required
                v-model="newUser.email"
            />
            <br />
            <label for="inputPassword" class="">Password</label>
            <input
                type="password"
                id="password"
                class="form-control bg-dark text-light"
                required
                v-model="newUser.password"
            />
            <br />
            <button
                class="btn btn-outline-success btn-block"
                @click.prevent="createUser()"
            >
                Create user
            </button>
        </form>
    </div>
</template>

<script>
import { userClient } from './../../services/userClient.js';

export default {
    data: function() {
        return {
            newUser: {
                name: '',
                email: ''
            }
        };
    },
    props: {
        user: {}
    },
    methods: {
        async createUser() {
            await userClient.createUser(this.newUser);
        }
    }
};
</script>

<style></style>
