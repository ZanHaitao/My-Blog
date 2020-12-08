<template>
    <div class="admin-nav">
        <ul>
            <li>
                控制台
                <ul>
                    <router-link to="/admin/index" tag="li">概要</router-link>
                    <router-link to="/admin/userinfo" tag="li">个人设置</router-link>
                </ul>
            </li>
            <li>
                撰写
                <ul>
                    <router-link tag="li" to="/admin/publishArticle">撰写文章</router-link>
                    <li>创建页面</li>
                </ul>
            </li>
            <li>
                管理
                <ul>
                    <li>文章</li>
                    <li>独立页面</li>
                    <li>评论</li>
                    <li>分类</li>
                    <li>标签</li>
                    <li>每日一句</li>
                </ul>
            </li>
            <router-link to="/admin/config" tag="li">设置</router-link>
        </ul>
        <ul>
            <li>{{$store.state.loginUser.userName}}</li>
            <li @click="loginOut">登出</li>
            <router-link to="/" tag="li">网站</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            loginOut() {
                this.$store.dispatch('changeLoginUser', {});
                this.$router.push({ name: 'login' });
                document.cookie = `Token='';path=/;expires=-1`
            }
        },
    }
</script>

<style lang="scss">
    .admin-nav {
        width: 100%;
        height: 40px;
        background: #292D33;
        display: flex;
        justify-content: space-between;

        &>ul {
            display: flex;

            &>li {
                height: 40px;
                line-height: 40px;
                padding: 0 20px;
                color: #bbb;
                font-size: 14px;
                position: relative;
                cursor: pointer;

                &:hover {
                    background-color: #202328;
                    color: #fff;

                    &>ul {
                        display: block;
                    }
                }

                &>ul {
                    display: none;
                    position: absolute;
                    left: 0;
                    width: 200%;
                    background: #202328;

                    &>li {
                        color: #bbb;

                        &:hover {
                            background: #292D33;
                            color: #fff;
                        }

                        padding-left: 20px;
                    }
                }
            }
        }
    }
</style>