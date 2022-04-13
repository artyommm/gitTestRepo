<template>
  <div class="app">
    <post-form/>
    <post-list v-bind:posts="posts"/>

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
      title: '',
      body: '',
    }
  },
  methods: {
    createPost(event) {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost);
      this.title = '';
      this.body = '';
    },
    inputTitle(event) {
      console.log(event);
      this.title = event.target.value;
    },
    inputBody(event) {
      console.log(event);
      this.body = event.target.value;
    }
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