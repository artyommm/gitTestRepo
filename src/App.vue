<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
    @click="showDialog"
    style = "margin: 15px 0px;"
    >
      Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

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
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      console.log(post);
      this.posts.push(post);
      this.dialogVisible=false;
    },
    removePost(post){
      this.posts = this.posts.filter(p=>p.id!==post.id);
    },
    showDialog(){
      this.dialogVisible=true;
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