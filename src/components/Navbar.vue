<template>
    <button @click="$router.push('/')">Main Page</button>
    <input v-model="blockNumberOrHash" placeholder="Enter block number or hash">
    <button @click="$router.push(`/block/${this.blockNumberOrHash}`)">Search</button>
    <input v-model="transactionHash" placeholder="Enter transaction hash">
    <button @click="$router.push(`/transaction/${this.transactionHash}`)">Search</button>
</template>

<script>
export default{
    name: "navbar",
    data(){
        return{
            blockNumberOrHash: "",
            transactionHash: ""
        }
    }
}
</script>

<style>
/* Общие стили для контейнера кнопок и полей ввода */
button, input {
    font-family: Arial, sans-serif;
    border-radius: 4px;
    margin: 8px 4px;
    padding: 8px 12px;
}

/* Стили для кнопок */
button {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 14px;
}

/* Эффект наведения для кнопок */
button:hover {
    background-color: #0056b3;
}

/* Стили для полей ввода */
input {
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    width: 200px; /* Ширина полей ввода */
}

/* Стили для основного контейнера */
template {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
}
</style>
