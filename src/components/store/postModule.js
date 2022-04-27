import axios from "axios";

export const postModule = {
    state: () => ({
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
    }),
    getters: {
        sortedPosts(state){ //... - оператор spread, в данном случае создание нового массива на основе существующего
            return [...state.posts].sort((post1,post2)=>{ //в данном случае sort возвращает новый массив
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])});
        },

        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations:{
        createPost(state, post){
            state.posts.push(post);
            state.dialogVisible = false;
        },
        setPosts(state, posts){
            state.posts = posts;
        },
        setLoading(state, bool){
            state.isPostsLoading = bool;
        },
        setPage(state, page){
            state.page = page;
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPosts({state, commit}){
            try {
                commit('setLoading', true); //this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                    params:{
                        _page: 0, //state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages',Math.ceil(response.headers['x-total-count']/state.limit)); // this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit);
                commit('setPosts', response.data); // this.posts = response.data;
            }catch (e) {
                alert(e);
            }finally {
                commit('setLoading', false); //this.isPostsLoading=false;
            }
        },

        async loadMorePosts({state, commit}){
            try {
                commit('setPage', state.page+1); //this.page+=1;
                // this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                    params:{
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count']/state.limit)); // this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit);
                commit('setPosts', [...state.posts, ...response.data]); // this.posts = [...this.posts, ...response.data];
            }catch (e) {
                alert(e);
            }finally {
                // this.isPostsLoading=false;
            }
        },
        showDialog({state}){
            state.dialogVisible=true;
        },
    },
    namespaced: true,
}