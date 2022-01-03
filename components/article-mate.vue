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
    <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following}">
      <i class="ion-plus-round"></i>
      &nbsp; Follow{{ article.author.username }}
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
    <button class="btn btn-sm btn-outline-primary" :class="{active:article.favorited}">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
};
</script>