<template>
    <div class="admin-index">
        <p class="title">网站概要</p>
        <p class="info">目前有<span class="tip">{{articleCount}}</span>篇文章，<span class="tip">{{commentCount}}</span>条评论，网站运行了<span class="tip">{{runDay}}</span>天</p>
        <p class="info">点击下面的链接快速开始 :</p>
        <p class="function">
            <router-link tag="span" to="/admin/publishArticle">撰写新文章</router-link>
            <router-link tag="span" to="/admin/userinfo">个人信息设置</router-link>
            <router-link tag="span" to="/admin/config">系统设置</router-link>
        </p>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                articleCount: 0,
                commentCount: 0,
                runDay: 0
            }
        },
        async created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000)

            this.articleCount = (await this.$api.getAritcleList()).count;
            this.commentCount = (await this.$api.getCommentList()).count;
            const config = await this.$api.getConfig();
            const nowTime = moment();
            const configTime = moment(config.createdAt);
            this.runDay = nowTime.diff(configTime, 'day');
        },
    }
</script>

<style lang="scss">
    .admin-index{
        width: 1000px;
        margin: 100px auto 0;

        .title{
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;
        }

        .info{
            color: #999;
            font-size: 17px;
            line-height: 40px;
            .tip{
                color: #000;
                font-size: 23px;
                font-weight: bold;
                font-style: italic;
                margin-right: 5px;
            }
        }
        .function{
            color: #477B9F;
            font-size: 17px;
            margin-top: 20px;
            padding-bottom: 50px;
            border-bottom: 1px solid #a1a1a15e;
            span{
                margin-right: 20px;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                    color: #499BC4;
                }
            }
        }
    }
</style>