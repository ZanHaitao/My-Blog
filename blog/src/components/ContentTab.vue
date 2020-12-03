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
                <dd v-for="item in aritcleList" :key="item.id">
                    <p class="title">{{ item.title }}</p>
                    <p class="text"><span class="el-icon-view icon"></span><span>{{ item.browse }}</span></p>
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
                commentList: []
            }
        },
        async created() {
            this.aritcleList = (await this.$api.getAritcleList({
                order: 1,
                limit: 5
            })).data;

            this.commentList = (await this.$api.getCommentList({
                order: 1,
                limit: 5
            })).data;
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

                &:hover {
                    background: #ECECEC;
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