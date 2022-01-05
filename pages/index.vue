<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="userInfo">
                <nuxt-link
                  :to="{ name: 'home', query: { tab: 'your_feed', } }"
                  :class="{ active: tab === 'your_feed' }"
                  class="nav-link"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{ name: 'home', query: { tab: 'gloab_feed' } }"
                  class="nav-link"
                  exact
                  :class="{ active: (tab === 'global_feed'&&!tag) }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  :to="{ name: 'home', query: { tab: tag,  } }"
                  :class="{ active: tag === tag }"
                  class="nav-link"
                  exact
                >
                  {{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-if="articles.length > 0">
            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username },
                  }"
                >
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: { slug: article.author.username },
                    }"
                  >
                    {{ article.author.username }}
                  </nuxt-link>
                  <span class="date">{{ article.updatedAt }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  :disabled="article.disabled"
                  @click="toggleFeed(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>

              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    id: article.slug,
                  },
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.body }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
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
                  name: 'home',
                  query: {
                    page: item,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{ name: 'home', query: { tag: tagItem } }"
                v-for="tagItem in tagList"
                :key="tagItem"
              >{{tagItem}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getArticles,
  favorArcticles,
  getTags,
  faviorArticle,
  removeFavior,
} from "@/api/article.js";
import { mapState } from "vuex";

export default {
  name: "home",
  async asyncData({ query, store }) {
    const limit = 2;
    const page = Number.parseInt(query.page || 1);
    const tab = query.tab || "global_feed";
    const tag=query.tag||""

    const loadArticle =
      store.state.user && tab === "your_feed" ? favorArcticles : getArticles;
    const [articlesRes, tagRes] = await Promise.all([
      loadArticle({
        limit: limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags(),
    ]);


    const { articles, articlesCount } = articlesRes.data;
    articles.forEach((article) => (article.disabled = false));
    return {
      articles,
      articlesCount,
      limit,
      page,
      tag,
      tab,
      tagList: tagRes.data.tags,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    pages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
     ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  methods: {
    async toggleFeed(item) {
      console.log(item);
      item.disabled = true;
      if (item.favorited) {
        await removeFavior(item.slug);
        item.favorited = false;
        item.favoritesCount -= 1;
      } else {
        await faviorArticle(item.slug);
        item.favorited = true;
        item.favoritesCount += 1;
      }

      item.disabled = false;
    },
  },
};
</script>