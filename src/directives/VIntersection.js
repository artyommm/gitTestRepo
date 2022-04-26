export default {
    mounted(el, binding){
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries, observer) => {
          if(entries[0].isIntersecting /*&& this.page < this.totalPages*/){
            //this.loadMorePosts(); //явный вызов функции
              binding.value(); //вызов функции через поле value у параметра binding
              //loadMorePosts передано параметром у этой директивы
            console.log('ПЕРЕСЕЧЕНИЕ')
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);  //указываем элемент, за которым наблюдаем
    },
    name: 'intersection'
}