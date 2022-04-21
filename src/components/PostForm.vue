<template>
  <form @submit.prevent action="">
    <h4>Создание поста</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Название"/>
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"/>
    <my-button
        style="align-self: flex-end; margin-top: 15px;"
        @click="createPost"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
export default {
  data(){
    return{
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods:{
    createPost() {
      this.post.id = Date.now();
      this.$emit('create',this.post)
      this.post = {
        title: '',
        body: ''
      }
    },
  },
  watch: {
    // post(newValue){ //watch срабатывает только единожды при создании
    //   console.log(newValue);
    // }
    // post:{
    //   handler(newValue){  //срабатывает при изменении полей объекта post
    //     console.log(newValue);
    //   },
    //   deep: true, //глубокое отслеживание
    // }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}




</style>