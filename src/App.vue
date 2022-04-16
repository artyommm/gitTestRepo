<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        v-bind:posts="posts"
        @remove="removePost"
    />

  </div>

</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default {
  components:{
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Описание поста'},
        {id: 2, title: 'JavaScript2', body: 'Описание поста2'},
        {id: 3, title: 'JavaScript3', body: 'Описание поста3'},
      ],
    }
  },
  methods: {
    createPost(post) {
      console.log(post);
      this.posts.push(post);
    },
    removePost(post){
      this.posts = this.posts.filter(p=>p.id!==post.id);
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}




</style>