<template>
    <div>
        <article-list :pageType="'过滤'" :type="articleTypeId+''" :label="''" />
    </div>
</template>

<script>
    import ArticleList from '@/components/ArticleList';
    export default {
        data() {
            return {
                articleTypeId: '',
            }
        },
        components: {
            ArticleList
        },
        created() {
            this.articleTypeId = this.$route.params.id;
        },
        watch: {
            $route() {
                this.articleTypeId = this.$route.params.id;
            }
        },
    }
</script>

<style>

</style>