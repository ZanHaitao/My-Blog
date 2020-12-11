<template>
    <div>
        <div class="tab">
            <ul>
                <li :class="{ 'active':currentSelect === 1 }" @click="currentSelect = 1" class="el-icon-sunrise-1"></li>
                <li :class="{ 'active':currentSelect === 2 }" @click="currentSelect = 2" class="el-icon-chat-line-round"></li>
            </ul>
        </div>
        <div class="tab-list">
            <dl v-if="currentSelect === 1">
                <dt class="list-title">热门文章</dt>
                <dd v-for="(item,index) in aritcleList" :key="item.id">
                    <div class="img">
                        <img :src="imgArr[index]" alt="">
                    </div>
                    <div class="right">
                        <p class="title" @click="handelClick(item)">{{ item.title }}</p>
                        <p class="text"><span class="el-icon-view icon"></span><span>{{ item.browse }}</span></p>
                    </div>

                </dd>
            </dl>
            <dl v-else class="tab-comment">
                <dt class="list-title">最新评论</dt>
                <dd v-for="item in commentList" :key="item.id">
                    <p class="title">{{ item.userName }}</p>
                    <p class="text">{{ item.content }}</p>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentSelect: 1,
                aritcleList: [],
                commentList: [],
                imgArr: [
                    'https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/sj2/2.jpg',
                    'https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/sj2/3.jpg',
                    'https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/sj2/9.jpg',
                    'https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/sj2/6.jpg',
                    'https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/sj2/10.jpg'
                ]
            }
        },
        async created() {
            this.aritcleList = (await this.$api.getAritcleList({
                order: 'browse',
                limit: 5
            })).data;

            this.commentList = (await this.$api.getCommentList({
                order: 1,
                limit: 5
            })).data;
        },
        methods: {
            handelClick(item) {
                this.$router.push({ name: 'articleDetail', params: { id: item.id } })
            }
        },
    }
</script>

<style lang="scss">
    .tab {
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05), 0 0 0 rgba(0, 0, 0, .05);

        ul {
            height: 60px;
            display: flex;
            justify-content: space-around;

            li {
                font-size: 20px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
                width: 50%;
                text-align: center;

                &.active {
                    border-bottom: 2px solid #000;
                }
            }
        }
    }

    .tab-list {
        .list-title {
            color: #777;
            padding: 20px 10px;
        }

        dl {
            dd {
                padding: 10px 20px;
                cursor: pointer;
                overflow: hidden;

                &:hover {
                    background: #ECECEC;
                }

                .img{
                    width: 40px;
                    height: 40px;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
                    overflow: hidden;
                }

                .right{
                    float: left;
                    width: calc(100% - 55px);
                    margin-left: 15px;
                }

                .title {
                    font-size: 14px;
                    color: #777;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-bottom: 5px;
                    line-height: 20px;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                .text {
                    font-size: 12px;
                    color: #777;

                    .icon {
                        margin-right: 5px;
                    }
                }

            }

        }

        .tab-comment {
            .text {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                line-height: 16px;
            }
        }
    }
</style>