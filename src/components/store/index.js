import {createStore} from "vuex";
import {postModule} from "@/components/store/postModule";


export default createStore({
    // state: {  //состояние
    //     likes: 0,
    //     isAuth: false,
    // },
    // getters: { //computed-свойства, кешируемые вычисляемые значения
    //     doubleLikes(state){
    //         return state.likes*2;
    //     }
    // },
    // mutations: { //функции, внутри которых меняется значение какого-то поля состояния
    //     incrementLikes(state){
    //         state.likes += 1;
    //     },
    //     decrementLikes(state){
    //         state.likes -= 1;
    //     }
    // },
    // actions: {//функции, которые внутри себя используют мутации
    // // (напрямую из экшенов менять состояние не рекомендуется)
    // //реализация side-эффектов
    //
    // },
    modules:{ //изолированный кусок состояния, со своими геттерами, мутациями и экшенами
        post: postModule,
    }
})