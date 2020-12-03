<template>
    <div class="blog-content">
        <div class="title">博客信息</div>
        <ul>
            <li>
                <span class="el-icon-notebook-1"></span>
                <span>文章数目</span>
                <span>{{ articleCount }}</span>
            </li>
            <li>
                <span class="el-icon-chat-line-round"></span>
                <span>评论数目</span>
                <span>{{ commentCount }}</span>
            </li>
            <li>
                <span class="el-icon-connection"></span>
                <span>运行天数</span>
                <span>{{ runDay }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                articleCount: 0,
                commentCount: 0,
                runDay: "1天"
            }
        },
        async created() {
            this.articleCount = (await this.$api.getAritcleList()).count;
            this.commentCount = (await this.$api.getCommentList()).count;
            const config = await this.$api.getConfig();
            const nowTime = moment();
            const configTime = moment(config.createdAt);
            this.runDay = nowTime.diff(configTime, 'day') + "天";
        },
    }
</script>

<style lang="scss">
    .blog-content {
        margin: 30px 0 0px;
        padding: 10px 0 40px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        .title {
            color: #777;
            padding: 20px 10px 20px;
        }

        ul {
            margin: 0 15px;
            background: #FEFEFE;
            color: #777;

            li {
                padding: 20px 15px;

                &>span:nth-child(1) {
                    margin-right: 10px;
                    font-size: 14px;
                }

                &>span:nth-child(2) {
                    font-size: 14px;
                }

                &>span:nth-child(3) {
                    float: right;
                    background-color: #cfdadd;
                    font-size: 12px;
                    color: #fff;
                    padding: 0 5px;
                    border-radius: 8px;
                    line-height: 1;
                    vertical-align: middle;
                    font-weight: 700;
                    text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
                    display: inline-block;
                    min-width: 10px;
                    padding: 3px 7px;
                }
            }
        }
    }
</style>