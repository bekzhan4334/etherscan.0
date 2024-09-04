<template>
    <div>Block number: {{ block.number }}</div>
    <div>Block hash: {{ block.hash }}</div>
    <div>Gas used: {{ block.gasUsed }}</div>
    <div>Base fee per gas: {{ block.baseFeePerGas }}</div>
    <p>Transactions list:</p>
    <div
    v-for="transaction in $store.state.transactions"
    :key="transaction.hash">
        {{ transaction.hash }}
    <button @click="$router.push(`/block/transaction/${transaction.hash}`)">More</button>
    </div>

</template>

<script>
import { mapActions } from 'vuex';
export default{
    name: "block-item",
    data(){
        return{
            block: {},
        }
    },
    props:{
        blockNumberOrHash:{
            type: String,
            required: true
        }
    },
    methods:{
        ...mapActions({
            getBlock: 'getBlock'
        })
    },
    async mounted(){
        this.block = await this.getBlock(this.blockNumberOrHash)
    },
    watch:{
        async blockNumberOrHash(){
            this.block = await this.getBlock(this.blockNumberOrHash)
        }
    }   
}
</script>

<style>
/* Общие стили для контейнера */
div {
    font-family: Arial, sans-serif;
    margin: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    color: #333;
}

/* Заголовки блоков */
div > div:first-of-type {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

/* Стили для списка транзакций */
div > div:nth-of-type(5) {
    margin-top: 16px;
    font-weight: bold;
    font-size: 16px;
}

/* Элементы транзакций */
div > div:not(:last-of-type) {
    margin-bottom: 8px;
}

/* Стили для кнопки */
button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 8px;
}

/* Эффект наведения для кнопки */
button:hover {
    background-color: #0056b3;
}

/* Стили для списка транзакций */
div > div > div {
    margin-top: 8px;
}
</style>
