<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  required
                  v-model="settingInfo.image"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  required
                  v-model="settingInfo.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  required
                  v-model="settingInfo.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  required
                  v-model="settingInfo.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="settingInfo.password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateInfo,getProfile } from "@/api/user";
import { mapMutations } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;


export default {
  middleware: "auth",
  data() {
    return {
      settingInfo: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    ...mapMutations(["setUser"]),
    async getInfo() {
      const res = await getProfile();
      this.settingInfo=res.data.user; 
    }, 
    async submit() {
      const res = await updateInfo({ user: this.settingInfo });
      if (res.status == 200) {
          this.setUser(res.data.user)
          Cookie.set("user", JSON.stringify(res.data.user));
        this.$router.push("/"); 
      }
    },
  },
};
</script>