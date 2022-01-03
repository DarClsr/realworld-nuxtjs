<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center" v-if="!isLogin">
            <nuxt-link to="/login"> Have an account? </nuxt-link>
          </p>
          <p class="text-xs-center" v-else>
            <nuxt-link to="/register"> Need an account? </nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(msgs, field) in errors">
              <li :key="index" v-for="(message, index) in msgs">
                {{ field }}
                {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="submit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="formParams.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="formParams.email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="formParams.password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/api/user";
import { mapMutations } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "login",
  computed: {
    isLogin() {
      return this.$route.name == "login";
    },
  },
  data() {
    return {
      errors: {},
      formParams: {
        username: "iwan_dd",
        email: "12@12.com",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async submit() {
      try {
        const res = this.isLogin 
          ? await login({ user: this.formParams })
          : await register({ user: this.formParams });
        if (res.status == 200) {
          this.setUser(res.data.user);
          Cookie.set("user", JSON.stringify(res.data.user));
          this.$router.push("/");
        }
      } catch ({ errors }) {
        this.errors = errors;
      }
    },
  },
};
</script>