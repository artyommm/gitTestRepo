<template>
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
</template>

<script>
export default {
  props:{
    page: {
      type: Number,
    },
    totalPages: {
      type: Number,
    },
  },
  methods: {
    changePage(pageNumber){
      //this.page = pageNumber; //нужно эмитить событие о смене страницы
      this.$emit('update:page',pageNumber);
    }
  }
}
</script>

<style scoped>
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