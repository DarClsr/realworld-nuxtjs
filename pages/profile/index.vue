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
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ user.username }}
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
import { profile } from "@/api/user";
import { getArticles, favorArcticles } from "@/api/article.js";
import ArticleItem from "@/components/article-item";
export default {
  middleware: "auth",
  components: {
    ArticleItem,
  },
  computed: {
    pages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  head(){
    return {
      title:`${this.user.username}`,
      meta:[
        {
        content:this.user.bio,
        name:"description",
        hid:"description"
      }
      ]
    }
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
 
    const [userRes, articleRes] =await Promise.all([
      profile(params.username),
      getArticles({
        limit: limit,
        offset: (page - 1) * limit,
        ...loadParams,
      }),
    ]);
    const { articles, articlesCount } = articleRes.data;
    return {
      user:userRes.data.profile,
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