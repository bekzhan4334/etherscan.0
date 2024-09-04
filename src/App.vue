<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script>
</script>

<style>
/* Основные стили для контейнера компонента */
template {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Стили для навбара */
navbar {
    background-color: #007bff;
    color: #fff;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Стили для основного контента */
router-view {
    flex: 1;
    padding: 16px;
    background-color: #f9f9f9;
    overflow-y: auto;
}
</style>

