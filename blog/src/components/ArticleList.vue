<template>
    <div class="article-list">
        <template v-if="articleData">
            <template v-if="pageType === '首页'">
                <router-link :to="{name:'articleDetail',params:{id:articleTopData.id}}" tag="div" class="article-top" :style="{'background-image':'url('+articleTopData.cover+')'}">
                    <div class="top-detail">
                        <p class="top-title"><span class="tip">置顶</span>{{ articleTopData.title }}</p>
                        <p class="top-content">{{ articleTopData.content }}</p>
                    </div>
                </router-link>
            </template>
            <template v-if="articleData.data.length == 0">
                <div class="list-tip">
                    暂无文章
                </div>
            </template>
            <ul>
                <li class="article-item" v-for="(item,index) in articleData.data" :key="item.id">
                    <div class="article-info">
                        <router-link :to="{name:'articleDetail',params:{id:item.id}}" tag="div" class="article-img" :class="{'left':index%2 != 0}" v-if="index%2 != 0" :style="{'background-image':'url('+item.cover+')'}">
                        </router-link>
                        <div class="article-text">
                            <router-link :to="{name:'articleDetail',params:{id:item.id}}" tag="p" class="article-title">{{ item.title }}</router-link>
                            <p class="article-content">
                                {{replaceMarked(item.content)}}
                            </p>
                        </div>
                        <router-link :to="{name:'articleDetail',params:{id:item.id}}" tag="div" class="article-img" :class="{'right':index%2 == 0}" v-if="index%2 == 0" :style="{'background-image':'url('+item.cover+')'}">
                        </router-link>
                    </div>
                    <div class="article-publish">
                        <span class="icon el-icon-user"></span>
                        <span class="text">{{ item.User.userName }}</span>
                        <span class="icon el-icon-time"></span>
                        <span class="text">{{ getDate(item.createdAt) }}</span>
                        <span class="icon el-icon-chat-square"></span>
                        <span class="text" v-if="item.isComment">{{ item.commentCount ? item.commentCount : '暂无评论' }}</span>
                        <span class="text" v-else>关闭评论</span>
                    </div>
                </li>
            </ul>
            <template v-if="articleData.count">
                <my-pagination :page="page" :limit="limit" :count="articleData.count" @changePage="changePage" />
            </template>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';
    import MyPagination from '@/components/Pagination';
    import marked from 'marked';

    export default {
        props: {
            pageType: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                articleData: '',
                page: 1,
                limit: 5,
                articleTopData: {}
            }
        },
        components: {
            MyPagination
        },
        async created() {
            this.getData();
            if (this.pageType === '首页') {
                this.articleTopData = (await this.$api.getAritcleList({
                    limit: 1,
                    isTop: 1
                })).data[0];
            }
        },
        methods: {
            getDate(date) {
                return moment(date).local().format('YYYY年MM月DD日');
            },
            changePage(page) {
                this.page = page;
            },
            async getData() {
                this.$store.dispatch('changeLoading', true);
                this.goTop();
                let where = {};
                if(this.type != ""){
                    where.ArticleTypeId = this.type;
                }
                if(this.label != ""){
                    where.LabelId = this.label;
                }
                this.articleData = await this.$api.getAritcleList({
                    page: this.page,
                    limit: this.limit,
                    ...where,
                    order: 1
                });

                this.articleData.data.forEach((item) => {
                    this.$api.getCommentList({
                        ArticleId: item.id
                    }).then(res => {
                        this.$set(item, 'commentCount', res.count)
                    })
                })
                this.$store.dispatch('changeLoading', false);
            },
            goTop() {
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                const timeTop = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
            },
            replaceMarked(content) {
                const str = marked(content);
                const reg = /\<[^>]*\>(([^<])*)/g;
                const result = str.replace(reg, function() {
                    let mark = "";
                    return arguments[1];
                });
                return result;
            }
        },
        watch: {
            page() {
                this.getData();
            },
            type(){
                this.getData();
            },
            label(){
                this.getData();
            }
        },
    }
</script>

<style lang="scss">

    .list-tip{
        text-align: center;
        color: #555;
        margin-top: 50px;
    }

    .article-list {
        padding: 20px;

        .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            background: #a0a0a0;
        }

        .hljs,
        .hljs-tag,
        .hljs-subst {
            color: #a0a0a0;
        }

        .hljs-strong,
        .hljs-emphasis {
            color: #a0a0a0;
        }

        .hljs-bullet,
        .hljs-quote,
        .hljs-number,
        .hljs-regexp,
        .hljs-literal,
        .hljs-link {
            color: #a0a0a0;
        }

        .hljs-code,
        .hljs-title,
        .hljs-section,
        .hljs-selector-class {
            color: #a0a0a0;
        }

        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-name,
        .hljs-attr {
            color: #a0a0a0;
        }

        .hljs-symbol,
        .hljs-attribute {
            color: #a0a0a0;
        }

        .hljs-params,
        .hljs-class .hljs-title {
            color: #a0a0a0;
        }

        .hljs-string,
        .hljs-type,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-selector-id,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-addition,
        .hljs-variable,
        .hljs-template-variable {
            color: #a0a0a0;
        }

        .hljs-comment,
        .hljs-deletion,
        .hljs-meta {
            color: #a0a0a0;
        }


        &>ul {
            padding: 0;
        }

        .article-top {
            margin-bottom: 20px;
            border-radius: 5px;
            height: 315px;
            background-size: cover;
            position: relative;
            overflow: hidden;
            cursor: pointer;

            .top-detail {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 135px;
                background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .5));
                color: #fff;
                padding: 30px;
                box-sizing: border-box;

                .top-title {
                    font-size: 22px;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    .tip {
                        font-size: 14px;
                        display: inline-block;
                        background-color: #F05050;
                        border-radius: 4px;
                        line-height: 22px;
                        padding: 0 10px;
                        vertical-align: middle;
                        font-weight: 700;
                        margin-right: 15px;
                    }
                }

                .top-content {
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .article-item {
            padding: 30px;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            transition: all .5s;

            &:hover {
                box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.15);
            }

            .article-info {
                display: flex;
                justify-content: flex-start;
                border-bottom: 1px solid rgba(222, 229, 231, .45);
                padding-bottom: 20px;

                .article-img {
                    width: 150px;
                    height: 150px;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                    border-radius: 5px;
                    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
                    cursor: pointer;

                    &.left {
                        margin-right: 20px;
                    }

                    &.right {
                        margin-left: 20px;
                    }
                }

                .article-text {
                    width: calc(100% - 170px);
                }

                .article-title {
                    font-size: 22px;
                    line-height: 40px;
                    color: #555;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    cursor: pointer;
                }

                .article-content {
                    font-size: 14px;
                    color: #a0a0a0 !important;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }

            .article-publish {
                color: #a0a0a0;
                font-size: 14px;
                padding-top: 20px;
                line-height: 20px;

                .icon {
                    margin-right: 5px;
                }

                .text {
                    margin-right: 10px;
                }
            }
        }
    }

    @media screen and (max-width:768px) {
        .article-item {
            padding: 20px !important;

            .article-info {
                .article-img {
                    display: none;
                }

                .article-text {
                    width: 100% !important;

                    .article-content {
                        line-height: 20px !important;
                    }
                }
            }
        }

    }
</style>