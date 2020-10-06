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
                                    :class="{
                                        __invalid: !validation.login.email
                                    }"
                                    autofocus
                                    v-model="formData.login.email"
                                />
                                <label for="inputPassword" class="sr-only"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    id="inputPassword"
                                    class="form-control bg-dark text-light"
                                    placeholder="Password"
                                    :class="{
                                        __invalid: !validation.login.password
                                    }"
                                    v-model="formData.login.password"
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
                                    :class="{
                                        __invalid: !validation.passwordReset
                                            .email
                                    }"
                                    placeholder="Email address"
                                    autofocus
                                    v-model="formData.passwordReset.email"
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
                                :class="{
                                    __invalid: !validation.register.name
                                }"
                                placeholder="Name"
                                autofocus
                                v-model="formData.register.name"
                            />
                            <label for="inputEmail" class="sr-only"
                                >Email</label
                            >
                            <input
                                type="text"
                                id="email"
                                class="form-control bg-dark text-light mb-2"
                                :class="{
                                    __invalid: !validation.register.email
                                }"
                                placeholder="Email address"
                                v-model="formData.register.email"
                            />
                            <label for="inputPassword" class="sr-only"
                                >Confirm password</label
                            >
                            <input
                                type="password"
                                id="password"
                                class="form-control bg-dark text-light mb-2"
                                :class="{
                                    __invalid: !validation.register.password
                                }"
                                placeholder="Password"
                                v-model="formData.register.password"
                            />
                            <label for="inputPassword" class="sr-only"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="confirmation"
                                class="form-control bg-dark text-light"
                                :class="{
                                    __invalid: !validation.register.confirmation
                                }"
                                placeholder="Confirm password"
                                v-model="formData.register.confirmation"
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
                    @click.prevent="oAuthLogin('google')"
                >
                    Sign in with Google
                </button>
                <button
                    class="btn btn-primary btn-block"
                    @click.prevent="oAuthLogin('facebook')"
                >
                    Sign in with Facebook
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '@/services/auth.js';

export default {
    data: function() {
        return {
            formData: {
                login: {
                    email: '',
                    password: ''
                },
                passwordReset: {
                    email: ''
                },
                register: {
                    name: '',
                    email: '',
                    password: '',
                    confirmation: ''
                }
            },
            validation: {
                login: {
                    email: true,
                    password: true
                },
                passwordReset: {
                    email: true
                },
                register: {
                    name: true,
                    email: true,
                    password: true,
                    confirmation: true
                }
            },
            showResetForm: false
        };
    },

    props: {
        auth: Boolean,
        verify: Boolean
    },

    methods: {
        loginValidation() {
            let status = true;
            this.validation.passwordReset.email = true;
            if (!this.formData.login.email) {
                status = false;
                this.validation.login.email = false;
            }
            if (!this.formData.login.password) {
                status = false;
                this.validation.login.password = false;
            }
            return status;
        },

        passwordResetValidation() {
            let status = true;
            this.validation.passwordReset.email = true;
            if (!this.formData.passwordReset.email) {
                status = false;
                this.validation.passwordReset.email = false;
            }
            return status;
        },

        registerValidation() {
            let status = true;
            this.validation.register.name = true;
            this.validation.register.email = true;
            this.validation.register.password = true;
            this.validation.register.confirmation = true;
            if (!this.formData.register.name) {
                status = false;
                this.validation.register.name = false;
            }
            if (!this.formData.register.email) {
                status = false;
                this.validation.register.email = false;
            }
            if (
                this.formData.register.password &&
                this.formData.register.password.length < 6
            ) {
                status = false;
                this.validation.register.password = false;
            }
            if (
                this.formData.register.password !==
                this.formData.register.confirmation
            ) {
                status = false;
                this.validation.register.confirmation = false;
            }
            return status;
        },

        async login() {
            if (this.loginValidation()) {
                const data = await auth.login(this.formData.login);
                if (data.status === 'success') this.$router.push('/');
            }
        },

        oAuthLogin(strategy) {
            window.location.href = `/api/login/${strategy}`;
        },

        async createUser() {
            if (this.registerValidation()) {
                await auth.createUser(this.formData.register);
            }
        },

        async requestResetToken() {
            if (this.passwordResetValidation()) {
                await auth.requestResetToken({
                    email: this.formData.passwordReset.email
                });
            }
        }
    },

    async created() {
        if (this.auth) {
            await auth.auth();
            this.$router.push('/').catch(() => {});
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
