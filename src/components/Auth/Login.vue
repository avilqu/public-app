<template>
    <div class="col-sm-12">
        <div class="__auth-card card text-center">
            <div class="card-header">
                <ul
                    class="nav nav-tabs nav-justified md-tabs indigo"
                    role="tablist"
                >
                    <!-- Login tab intro -->
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#__login"
                            role="tab"
                            aria-controls="__login"
                            aria-selected="true"
                            >Login</a
                        >
                    </li>

                    <!-- Register tab intro -->
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#__register"
                            role="tab"
                            aria-controls="__register"
                            aria-selected="false"
                            >Register</a
                        >
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <!-- Login tab -->
                    <div
                        class="tab-pane fade show active"
                        id="__login"
                        role="tabpanel"
                    >
                        <div v-if="!showResetForm">
                            <h5 class="card-title mb-3">
                                <strong>Login</strong>
                            </h5>
                            <form>
                                <label for="inputEmail" class="sr-only"
                                    >Email address</label
                                >
                                <input
                                    type="email"
                                    id="inputEmail"
                                    class="form-control bg-dark text-light mb-2"
                                    placeholder="Email address"
                                    required
                                    autofocus
                                    v-model="credentials.email"
                                />
                                <label for="inputPassword" class="sr-only"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    id="inputPassword"
                                    class="form-control bg-dark text-light"
                                    placeholder="Password"
                                    required
                                    v-model="credentials.password"
                                />
                                <p
                                    class="mt-2 mb-2 text-muted text-right small"
                                    @click="
                                        showResetForm = true;
                                        title = 'Reset your password';
                                    "
                                >
                                    Forgot your password?
                                </p>
                                <br />
                                <button
                                    type="submit"
                                    class="btn btn-outline-success btn-block"
                                    @click.prevent="login()"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                        <div v-else>
                            <h5 class="card-title mb-3">
                                <strong>Reset your password</strong>
                            </h5>
                            <p class="mb-3 text-center text-muted">
                                You will receive a secure link to reset your
                                password.
                            </p>
                            <form>
                                <input
                                    type="email"
                                    id="emailReset"
                                    class="form-control bg-dark text-light mb-3"
                                    placeholder="Email address"
                                    required
                                    autofocus
                                    v-model="emailReset"
                                />
                                <button
                                    type="submit"
                                    class="btn btn-outline-success btn-block"
                                    @click.prevent="requestResetToken()"
                                >
                                    Send
                                </button>
                            </form>
                            <p
                                class="mt-3 mb-3 text-muted"
                                @click="
                                    showResetForm = false;
                                    title = 'Login';
                                "
                            >
                                Back to login
                            </p>
                        </div>
                    </div>

                    <!-- Register tab -->
                    <div class="tab-pane fade" id="__register" role="tabpanel">
                        <h5 class="card-title mb-3">
                            <strong>Create an account</strong>
                        </h5>
                        <form>
                            <label for="inputName" class="sr-only">Name</label>
                            <input
                                type="text"
                                id="userName"
                                class="form-control bg-dark text-light mb-2"
                                placeholder="Name"
                                required
                                autofocus
                                v-model="newUser.name"
                            />
                            <label for="inputEmail" class="sr-only"
                                >Email</label
                            >
                            <input
                                type="text"
                                id="email"
                                class="form-control bg-dark text-light mb-2"
                                placeholder="Email address"
                                required
                                v-model="newUser.email"
                            />
                            <label for="inputPassword" class="sr-only"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="password"
                                class="form-control bg-dark text-light"
                                placeholder="Password"
                                required
                                v-model="newUser.password"
                            />
                            <br />
                            <button
                                type="submit"
                                class="btn btn-outline-success btn-block"
                                @click.prevent="createUser()"
                            >
                                Create user
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="__auth-card mt-3 card text-center">
            <h5 class="card-title mt-3 mb-3">
                <strong>Social login</strong>
            </h5>
            <p class="mb-3 text-center text-muted">
                Or simply login with your social media account.
            </p>
            <div class="card-body">
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
    </div>
</template>

<script>
import { auth } from '@/services/auth.js';
import { apiClient } from '@/services/apiClient.js';

export default {
    data: function() {
        return {
            credentials: {},
            newUser: {},
            showResetForm: false,
            emailReset: ''
        };
    },

    props: {
        auth: Boolean,
        verify: Boolean
    },

    methods: {
        async login() {
            const data = await auth.login(this.credentials);
            if (data.status === 'success') this.$router.push('/');
        },

        async createUser() {
            await auth.createUser(this.newUser);
        },

        async googleLogin() {
            window.location.href = '/api/login/google';
        },

        async facebookLogin() {
            window.location.href = '/api/login/facebook';
        },

        async requestResetToken() {
            await auth.requestResetToken({
                email: this.emailReset
            });
        }
    },

    async created() {
        if (this.auth) {
            await auth.auth();
            this.$router.push('/');
        }

        if (this.verify) {
            await auth.verify(this.$route.params.id, this.$route.params.token);
        }
    }
};
</script>

<style>
@import './../../assets/css/login.css';
</style>
