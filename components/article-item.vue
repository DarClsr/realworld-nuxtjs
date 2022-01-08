<template>
  <div v-if="article" class="article-preview">
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
            params: { username: article.author.username },
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
      <ul class="tag-list" v-if="article.tagList">
        <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">{{tag}}</li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
import {
  faviorArticle,
  removeFavior,
} from "@/api/article.js";
export default {
  props: {
    article: {
      typeo: Object,
      default: () => {},
    },
  },
  methods:{
       async toggleFeed(item) {
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
  }
};
</script>