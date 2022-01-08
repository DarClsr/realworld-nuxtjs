<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="submit">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            v-model="comment.body"
            required
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            class="comment-author-img"
          />
          <button class="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>

      <div
        class="card"
        v-for="commentItem in commentList"
        :key="commentItem.id"
      >
        <div class="card-block">
          <p class="card-text">
            {{ commentItem.body }}
          </p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img
              src="http://i.imgur.com/Qr71crq.jpg"
              class="comment-author-img"
            />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{
            commentItem.author.username
          }}</a>
          <span class="date-posted">{{ commentItem.createdAt | date }}</span>
          <span class="mod-options" @click="remove(commentItem)" v-if="isProfile(commentItem)">
            <i class="ion-trash-a"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, removeComment } from "@/api/comment";
import { mapState } from "vuex";

export default {
  props: {
    slug: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
    }),
    isProfile() {
      return ({ author }) => {
        return author.username === this.userInfo.username;
      };
    },
  },
  data() {
    return {
      commentList: [],
      comment: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getComments(this.slug);
      if (res.status == 200) {
        this.commentList = res.data.comments || [];
        console.log(this.commentList, res.data);
      }
    },
    async submit() {
      const res = await addComment(this.slug, { comment: this.comment });
      if (res.status == 200) {
        this.getList();
      }
    },
    async remove(item) {
        const res=await removeComment(this.slug,item.id);
        this.getList();
    },
  },
};
</script>