<template>
    <div class="index-page">
        <div class="content-header">
            <p class="title">{{ config.title }}</p>
            <p class="every-day">{{ everyDay.content }}</p>
        </div>
        <div class="article-content">
            <article-list :pageType="'首页'" :type="''" :label="''" />
        </div>
    </div>
</template>

<script>
    import ArticleList from '@/components/ArticleList';
    export default {
        data() {
            return {
                config: {},
                everyDay: {}
            }
        },
        components: {
            ArticleList,
        },
        async created() {
            this.config = await this.$api.getConfig();
            this.everyDay = await this.$api.getOnceEveryDay();
        },
    }
</script>

<style lang="scss" scoped>
    .content-header {
        height: 120px;
        width: 100%;
        background: #F9F9F9;
        padding: 20px;
        box-sizing: border-box;

        .title {
            font-weight: 300;
            font-size: 30px;
            padding: 15px 0 15px;
        }

        .every-day {
            color: #a0a0a0;
            font-size: 13px;
        }
    }
</style>