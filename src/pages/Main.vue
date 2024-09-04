<template>
    <block
        v-for="block in $store.state.blocks"
        :block = "block"
    />
</template>

<script>
import { mapActions } from 'vuex'
export default{
    methods:{
        ...mapActions({
            newBlockHeaders: "newBlockHeaders"
        })
    },
    mounted(){
        this.newBlockHeaders()
    }
}
</script>

<style>
/* Основные стили для контейнера компонента */
template {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    padding: 16px;
}

/* Стили для элементов блока */
block {
    width: 100%;
    max-width: 800px;
    margin-bottom: 16px;
}

/* Отделение элементов друг от друга */
block + block {
    margin-top: 16px;
}

/* Прокрутка, если содержимое превышает высоту контейнера */
template {
    overflow-y: auto;
}
</style>
