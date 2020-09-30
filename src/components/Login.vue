<template>
    <div class="col-sm-12 text-center">
        <form class="form-signin text-center">
            <div v-if="!showResetForm">
                <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input
                    type="email"
                    id="inputEmail"
                    class="form-control bg-dark text-light"
                    placeholder="Email address"
                    required
                    autofocus
                    v-model="credentials.email"
                />
                <label for="inputPassword" class="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    class="form-control bg-dark text-light"
                    placeholder="Password"
                    required
                    v-model="credentials.password"
                />
                <button
                    class="btn btn-outline-success btn-block"
                    @click.prevent="login()"
                >
                    Sign in
                </button>
                <p class="mt-5 mb-3 text-muted" @click="showResetForm = true">
                    Forgotten password?
                </p>
            </div>
            <div v-else>
                <h1 class="h3 mb-3 font-weight-normal">
                    Send reset link
                </h1>
                <p class="mt-5 mb-3 text-muted text-left">
                    A secure link with instructions to reset your password will
                    be sent by email.
                </p>
                <input
                    type="email"
                    id="emailReset"
                    class="form-control bg-dark text-light"
                    placeholder="Email address"
                    required
                    autofocus
                    v-model="emailReset"
                />
                <button
                    class="btn btn-outline-success btn-block"
                    @click.prevent="requestResetToken()"
                >
                    Send
                </button>
                <p class="mt-5 mb-3 text-muted" @click="showResetForm = false">
                    Back to login
                </p>
            </div>
        </form>
        <div class="form-signin text-center">
            <button
                class="btn btn-danger btn-block"
                @click.prevent="googleLogin()"
            >
                Sign in with Google
            </button>
            <button
                class="btn btn-primary btn-block"
                @click.prevent="facebookLogin()"
            >
                Sign in with Facebook
            </button>
        </div>
    </div>
</template>

<script>
import { auth } from './../services/auth.js';
import { userClient } from './../services/userClient.js';

export default {
    data: function() {
        return {
            credentials: {},
            showResetForm: false,
            emailReset: ''
        };
    },
    methods: {
        async login() {
            const data = await auth.login(this.credentials);
            if (data.status === 'success') this.$router.push('/');
        },
        async googleLogin() {
            window.location.href = '/api/login/google';
        },
        async facebookLogin() {
            window.location.href = '/api/login/facebook';
        },
        async requestResetToken() {
            await userClient.requestResetToken({
                email: this.emailReset
            });
        }
    }
};
</script>

<style>
@import './../assets/css/login.css';
</style>
