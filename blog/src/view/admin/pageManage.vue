<template>
    <div class="page-manage">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="page-manage-title">
            管理独立页面
            <router-link to="/admin/publishPage" tag="span" class="page-manage-publish">新增</router-link>
        </div>
        <div class="page-manage-content">
            <template v-if="pageData.count">
                <table-content :dataList="pageData.data" :type="'页面'" @handleEdit="handleEdit" @handleDelete="handleDelete" />
                <my-pagination :page="page" :limit="limit" :count="pageData.count" @changePage="changePage" />
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
                pageData: {},
                page: 1,
                limit: 10
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
                this.pageData = await this.$api.getPageList({
                    page: this.page,
                    limit: this.limit,
                });
            },
            changePage(page) {
                this.page = page;
            },
            handleEdit(data) {
                this.$router.push({
                    name: 'editPage',
                    params: {
                        data: data
                    }
                })
            },
            async handleDelete(data) {
                const result = await this.$api.deletePage(data.id);
                if (result) {
                    this.sendMessage("删除成功！");
                    setTimeout(() => {
                        this.getData();
                    }, 3000)
                } else {
                    this.sendMessage("删除失败！");
                }
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
    .page-manage {
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

        .page-manage-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;

            .page-manage-publish {
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