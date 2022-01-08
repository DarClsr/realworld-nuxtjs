<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content" v-html="article.body"></div>

      <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline ng-binding ng-scope" v-for="tag in article.tagList" :key="tag">
            {{tag}}
          </li>
        </ul>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <comments :slug="article.slug" /> 


    </div>
  </div>
</template>


<script>
import { articleInfo } from "@/api/article";
import MarkDownIt from "markdown-it";
import ArticleMeta from "@/components/article-mate.vue";
import Comments from "@/components/comments.vue"
export default {
  middleware: "auth",
  async asyncData({ params }) {
    const articleRes = await articleInfo(params.id);
    const article = articleRes.data.article;
    const md = new MarkDownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
   components: {
    ArticleMeta,
    Comments
  },
  
  head(){
    return {
      title:`${this.article.title}`,
      meta:[
        {
        content:this.article.description,
        name:"description",
        hid:"description"
      }
      ]
    }
  }
};
</script>