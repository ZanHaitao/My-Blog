<template>
    <div class="article-manage">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="article-manage-title">
            管理文章
            <router-link to="/admin/publishArticle" tag="span" class="article-manage-publish">新增</router-link>
        </div>
        <div class="article-manage-content">
            <template v-if="articleData.count">
                <table-content :dataList="articleData.data" :type="'文章'" @handleEdit="handleEdit" @handleDelete="handleDelete" />
                <my-pagination :page="page" :limit="limit" :count="articleData.count" @changePage="changePage" />
            </template>
        </div>
    </div>
</template>

<script>
    import TableContent from '@/components/TableContent';
    import MyPagination from '@/components/Pagination';
    export default {
        data() {
            return {
                message: '',
                showMessage: false,
                articleData: {},
                page: 1,
                limit: 10,
            }
        },
        components: {
            TableContent,
            MyPagination
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000);

            this.getData();
        },
        methods: {
            async getData() {
                this.articleData = await this.$api.getAritcleList({
                    page: this.page,
                    limit: this.limit,
                    order: 1
                });
            },
            changePage(page) {
                this.page = page;
            },
            async handleDelete(data) {
                const result = await this.$api.deleteAritcle(data.id);
                if (result) {
                    this.sendMessage("删除成功！");
                    setTimeout(() => {
                        this.getData();
                    }, 3000)
                } else {
                    this.sendMessage("删除失败！");
                }
            },
            handleEdit(data) {
                this.$router.push({
                    name: 'editArticle',
                    params: {
                        data: data
                    }
                })
            },
            sendMessage(content) {
                this.showMessage = true;
                this.message = content;
                setTimeout(() => {
                    this.showMessage = false;
                    this.message = "";
                }, 3000)
            }
        },
        watch: {
            page() {
                this.getData();
            }
        },
    }
</script>

<style lang="scss">
    .article-manage {
        width: 1000px;
        margin: 100px auto 0;

        .tip {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #8a6d38;
            background: #FFF6BF;
        }

        .article-manage-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;

            .article-manage-publish {
                font-size: 14px;
                display: inline-block;
                padding: 5px 5px;
                background: #E9E9E6;
                color: #467B96;
                margin-left: 10px;
                cursor: pointer;

                &:hover {
                    color: #499BC3;
                }
            }
        }
    }
</style>