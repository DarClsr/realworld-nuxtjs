<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/"> conduit </nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link" exact> Home </nuxt-link>
          <!-- Add "active" class when you're on that page" -->
        </li>
        <template v-if="userInfo">
          <li class="nav-item">
            <nuxt-link to="/editor" class="nav-link">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/settings" class="nav-link">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link :to="`/profile/${userInfo.username}`" class="nav-link">
              <img class="user-pic" :src="userInfo.image" />
              {{ userInfo.username }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link"> Sign in </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link"> Sign up </nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  mounted(){
    console.log(this.userInfo)
  }
};
</script>

<style scoped>
.nav-link .user-pic{
  width: 26px;
}
</style>