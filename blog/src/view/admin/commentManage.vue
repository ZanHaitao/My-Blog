<template>
    <div class="comment-manage">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="comment-manage-title">
            管理评论
        </div>
        <div class="comment-manage-content">
            <template v-if="commentData.count">
                <table-content :dataList="commentData.data" :type="'评论'" @handleEdit="handleEdit" @handleDelete="handleDelete" />
                <my-pagination :page="page" :limit="limit" :count="commentData.count" @changePage="changePage" />
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
                commentData: {},
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
                this.commentData = await this.$api.getCommentList({
                    page: this.page,
                    limit: this.limit,
                });
            },
            changePage(page) {
                this.page = page;
            },
            async handleDelete(data) {
                const result = await this.$api.deleteComment(data.id)
                if (result) {
                    this.sendMessage("删除成功！");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    this.sendMessage("删除失败！")
                }
            },
            async handleEdit(data, content) {
                const result = await this.$api.addReply({
                    content: data.content,
                    userName: this.$store.state.loginUser.userName,
                    email: this.$store.state.loginUser.email,
                    CommentId: data.id,
                    type: 'admin'
                })
                if (result) {
                    this.sendMessage("回复成功！");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    this.sendMessage("回复失败！")
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
    .comment-manage {
        width: 1000px;
        margin: 50px auto 0;

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

        .comment-manage-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;
        }
    }
</style>