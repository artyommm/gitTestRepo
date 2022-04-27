<template>
  <div >
<!--    <h1>{{$store.state.isAuth ? "Пользователь авторизован" : "Авторизируйтесь, чтобы использовать сервис"}}</h1>-->
<!--    <h1>{{$store.state.likes}}</h1>-->
<!--    <h1>{{$store.getters.doubleLikes}}</h1>-->
<!--    <div>-->
<!--      <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>-->
<!--      <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>-->
<!--    </div>-->
    <h1>Страница с постами</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        v-focus
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост</my-button>

      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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

<!--    <div ref="observer" class="observer"></div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
<!--        <post-pagination-->
<!--            v-bind:totalPages = "totalPages"-->
<!--            v-model:page="page"-->
<!--        />-->


  </div>

</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import PostPagination from "@/components/PostPagination";
import axios from 'axios';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components:{
    PostList, PostForm, PostPagination
  },
  data() {
    return {
      //dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      createPost: 'post/createPost',
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
      showDialog: 'post/showDialog',
    }),
    // createPost(post) {
    //   console.log(post);
    //   //this.posts.push(post);
    //   this.createPost()
    //   this.dialogVisible=false;
    // },
    removePost(post){
      this.posts = this.posts.filter(p=>p.id!==post.id);
    },
    // showDialog(){
    //   this.dialogVisible=true;
    // },

    // changePage(pageNumber){
    //   this.page = pageNumber;
    // }
  },
  mounted(){
    this.fetchPosts();
    //console.log(this.$refs.observer);
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPages){
    //     this.loadMorePosts();
    //     console.log('ПЕРЕСЕЧЕНИЕ')
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed:{
    ...mapState({
      posts: state => state.post.posts,
      dialogVisible: state => state.post.dialogVisible,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page, //номер страницы
      limit: state => state.post.limit, //максимальное количество постов на одной странице
      totalPages: state => state.post.totalPages, //общее число страниц
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
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

    // page(){
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>


.app__btns{
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}

.observer{
  height: 30px;
  background: green;
}

</style>