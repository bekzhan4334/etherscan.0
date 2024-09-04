<template>
    <div>Transactoin hash: {{ transaction.hash }}</div>
    <div>Nonce: {{ transaction.nonce }}</div>
    <div>Transaction index: {{ transaction.transactionIndex }}</div>
    <div>From: {{ transaction.from }}</div>
    <div>To: {{ transaction.to }}</div>
    <div>Value: {{ transaction.value }}</div>
    <div>Gas: {{ transaction.gas }}</div>
    <a :href="`https://etherscan.io/tx/${transaction.hash}`" target="_blank">Etherscan</a>

</template>

<script>
import { mapActions } from 'vuex';
export default{
    name: "transaction-item",
    data(){
        return{
            transaction: {},
        }
    },
    props:{
        transactionHash:{
            type: String,
            required: true
        }
    },
    methods:{
        ...mapActions({
            getTransaction: 'getTransaction'
        })
    },
    async mounted(){
        this.transaction = await this.getTransaction(this.transactionHash)
    },
    watch:{
        async transactionHash(){
            this.transaction = await this.getTransaction(this.transactionHash)
        }
    }   
}
</script>

<style>
/* Общие стили для контейнера данных */
div {
    font-family: Arial, sans-serif;
    margin: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    color: #333;
}

/* Стили для заголовков */
div > div:first-of-type {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
}

/* Стили для информации о транзакции */
div > div {
    margin-bottom: 8px;
    font-size: 14px;
}

/* Стили для ссылки Etherscan */
a {
    display: inline-block;
    margin-top: 16px;
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}

/* Эффект наведения для ссылки */
a:hover {
    color: #0056b3;
}
</style>
