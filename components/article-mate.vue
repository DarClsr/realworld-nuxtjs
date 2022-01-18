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
        @click="toogleFollow(article.author.following)"
        :disabled="disabled"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{article.author.following?'unFollow':"Follow"}} {{ article.author.username }} {{ article.author.following}}
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        :disabled="disabled"
       @click="toggleFeed"
      >
        <i class="ion-heart"></i>
        &nbsp;  {{article.favorited?'Unfavorite Article':"Favorite Post"}}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {removeArticle, faviorArticle,
  removeFavior,} from "@/api/article"
import {removeFollow,followUser} from "@/api/user"
export default {
  props: {
    article: {
      type: Object,
    },
  },
  data(){
    return {
      disabled:false,
    }
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
    },
    async toogleFollow(follow){
      this.disabled = true;

     const res=follow? await removeFollow(this.article.author.username):await followUser(this.article.author.username);
     this.$emit("follow",res.data.profile)
      this.disabled = false;

   },
    async toggleFeed() {
      this.disabled = true;
      const item=this.article;
      if (item.favorited) {
        await removeFavior(item.slug);
        item.favorited = false;
        item.favoritesCount -= 1;
      } else {
        await faviorArticle(item.slug);
        item.favorited = true;
        item.favoritesCount += 1;
      }

      this.$emit("feed",item);
      this.disabled = false;
    },
  }
};
</script>