<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост</my-button>

      <my-select
      v-model="selectedSort"
      :options="sortOptions"
      />
    </div>

    <my-button
        @click="fetchPosts"
        style = "margin: 15px 0px;"
    >
      Получить посты
    </my-button>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        v-bind:posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />

    <div v-else>Идёт загрузка...</div>

    <div class="page__wrapper">
      <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
            'current-page': page === pageNumber
          }"
          @click="changePage(pageNumber)"
      >
        {{pageNumber}}
      </div>
    </div>

  </div>

</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';

export default {
  components:{
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1, //номер страницы
      limit: 10, //максимальное количество постов на одной странице
      totalPages: 0, //общее число страниц
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
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
    },
    async fetchPosts(){
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit);
        this.posts = response.data;
      }catch (e) {
        alert(e);
      }finally {
        this.isPostsLoading=false;
      }
    },
    changePage(pageNumber){
      this.page = pageNumber;
    }
  },
  mounted(){
    this.fetchPosts();
  },
  computed:{
    sortedPosts(){ //... - оператор spread, в данном случае создание нового массива на основе существующего
      return [...this.posts].sort((post1,post2)=>{ //в данном случае sort возвращает новый массив
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])});
    },

    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: { //следим за моделью selectedSort
    // selectedSort(newValue) { //функция-наблюдатель должна иметь такое же имя, что и модель за которой наблюдает
    //   //console.log(newValue);
    //   this.posts.sort((post1,post2)=>{ //в данном случае sort мутирует исходный массив
    //     return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
    //   })
    // },
    // dialogVisible(newValue){
    //   console.log(newValue);
    // }
    page(){
      this.fetchPosts();
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

.app__btns{
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper{
  display: flex;
  margin-top: 15px;
}

.page{
  border: 1px solid black;
  padding: 10px;
}

.current-page{
  border: 2px solid green;
}

</style>