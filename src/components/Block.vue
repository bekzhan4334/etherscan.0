<template>
    <div>Block number: {{ block.number }}</div>
    <div>Block hash: {{ block.hash }}</div>
    <button @click="$router.push(`/block/${block.number}`)">More</button>
</template>

<script>
export default{
    name: "block",
    props:{
        block:{
            type: Object,
            required: true
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

/* Стили для заголовка */
div:first-of-type {
    font-size: 18px;
    font-weight: bold;
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
}

/* Эффект наведения для кнопки */
button:hover {
    background-color: #0056b3;
}
</style>
