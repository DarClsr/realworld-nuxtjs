<template>
  <div class="article-meta">
    <nuxt-link :to="`/profile/${article.author.username}`" class="nav-link">
      <img class="user-pic" :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="`/profile/${article.author.username}`" class="nav-link">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createAt | date }}</span>
    </div>

    <template v-if="isProfile">

    <nuxt-link
       class="btn btn-outline-secondary btn-sm"
      :to="{
        name: 'editor',
        params: {
          id: article.slug,
        },
      }"
    >
     <i class="ion-edit"></i> Edit Article
    </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" @click="remove">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow{{ article.author.username }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {removeArticle} from "@/api/article"
export default {
  props: {
    article: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
    }),
    isProfile() {
      return this.article.author.username === this.userInfo.username;
    },
  },
  methods:{
    async remove(){
      await removeArticle(this.article.slug);
      this.$router.push("/")
    }
  }
};
</script>