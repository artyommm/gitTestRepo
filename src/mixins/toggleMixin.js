export default {
    props: {
        show:{
            type: Boolean,
            default: false,
        }

    },
    methods:{
        hideDialog(){ //всё что мы добавили в mixin будет доступно через this внутри компонента
            this.$emit('update:show',false);
        }
    },
    mounted(){
        console.log('mounted из mixin')
    },
    //...
}