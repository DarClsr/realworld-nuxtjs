<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="confirmAticle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  required
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  required
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keydown.enter.prevent="addTag"
                />
                <div class="tag-list">
                  <p class="error-messages" v-if="error">已经有相同的tag了</p>
                  <span
                    class="tag-pill tag-default"
                    v-for="(tag, index) in article.tagList"
                    :key="tag"
                  >
                    <i
                      class="ion-close-round"
                      @click.stop="removeTag(index)"
                    ></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle, articleInfo,editArticle } from "@/api/article";

export default {
  middleware: "auth",
  data() {
    return {
      tag: "",
      error: false,
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  mounted(){
    this.getArticle()
  },
  methods: {
    async getArticle() {
      const slug = this.$route.params.id;
      if (!slug) return false;
      const articleRes = await articleInfo(slug);
      const article = articleRes.data.article;
      this.article=article;
    },
    addTag() {
      this.error = false;
      const has = this.article.tagList.find((v) => v == this.tag);
      if (!has) {
        this.article.tagList.push(this.tag);
        this.tag = "";
      } else {
        this.error = true;
      }
    },
    removeTag(i) {
      this.article.tagList.splice(i, 1);
    },
    async confirmAticle() {
      const slug = this.$route.params.id;
      const res =slug?await editArticle(slug,{article:this.article}):  await addArticle({
        article: this.article,
      });
      if (res.status == 200) {
        const slug = res.data.article.slug;
        this.$router.replace({
          name: "article",
          params: {
            id: slug,
          },
        });
      }
    },
  },
};
</script>