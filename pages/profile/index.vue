<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <template v-if="isProfile">
             <nuxt-link to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
             <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            </template>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="toogleFollow(user.following)"
              :disabled="disabled"
              v-else
              :class="{ active: user.following }"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ user.following ? "unFollow" : "Follow" }}
              {{ user.username }} {{ user.following }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: { tab: 'my' },
                    params: { username: $route.params.username },
                  }"
                  :class="{ active: tab === 'my' }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    query: { tab: 'favor' },
                    params: { username: $route.params.username },
                  }"
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'favor' }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-if="myArticles && myArticles.length > 0"
          >
            <article-item
              v-for="article in myArticles"
              :key="article.slug"
              :article="article"
            />
          </div>
          <div v-else>
            <span>no Article</span>
          </div>

          <ul class="pagination">
            <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            <li
              class="page-item ng-scope"
              v-for="item in pages"
              :key="item"
              :class="{ active: page === item }"
            >
              <nuxt-link
                class="page-link ng-binding"
                :to="{
                  name: 'profile',
                  query: {
                    page: item,
                    tab: tab,
                  },
                  params: {
                    username: $route.params.username,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profile,removeFollow,followUser } from "@/api/user";
import { getArticles } from "@/api/article.js";
import ArticleItem from "@/components/article-item";
import { mapState } from "vuex";

export default {
  middleware: "auth",
  components: {
    ArticleItem,
  },
  computed: {
    pages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState({
      userInfo: (state) => state.user,
    }),
    isProfile() {
      return this.user.username === this.userInfo.username;
    },
  },
  data(){
    return {
      disabled:false,
    }
  },
  head() {
    return {
      title: `${this.user.username}`,
      meta: [
        {
          content: this.user.bio,
          name: "description",
          hid: "description",
        },
      ],
    };
  },
  methods:{
    async toogleFollow(follow){
      this.disabled = true;
     const res=follow? await removeFollow(this.user.username):await followUser(this.user.username);
      this.disabled = false;
      this.user=res.data.profile

   },
  },
  async asyncData({ params, query }) {
    const limit = 2;
    const page = Number.parseInt(query.page || 1);
    const tab = query.tab || "my";
    let loadParams =
      tab === "favor"
        ? {
            favorited: params.username,
          }
        : {
            author: params.username,
          };

    const [userRes, articleRes] = await Promise.all([
      profile(params.username),
      getArticles({
        limit: limit,
        offset: (page - 1) * limit,
        ...loadParams,
      }),
    ]);
    const { articles, articlesCount } = articleRes.data;
    return {
      user: userRes.data.profile,
      myArticles: articles,
      articlesCount,
      tab,
      limit,
      page,
    };
  },
  watchQuery: ["page", "tag", "tab"],
};
</script>