<template>
    <div>
        <article-list :pageType="'过滤'" :type="''" :label="articleLabelId+''" />
    </div>
</template>

<script>
    import ArticleList from '@/components/ArticleList';
    export default {
        data() {
            return {
                articleLabelId: '',
            }
        },
        components: {
            ArticleList
        },
        created() {
            this.articleLabelId = this.$route.params.id;
        },
        watch: {
            $route() {
                this.articleLabelId = this.$route.params.id;
            }
        },
    }
</script>

<style>

</style>