<template>
    <div class="admin-page">
        <admin-nav />
        <router-view></router-view>
    </div>
</template>

<script>
    import AdminNav from "@/components/AdminNav";
    export default {
        components: {
            AdminNav
        }
    }
</script>

<style lang="scss">
    .admin-page {
        width: 1600px;
        height: 100%;
        margin: 0 auto;
    }
</style>