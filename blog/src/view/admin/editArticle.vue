<template>
    <div class="publish-article">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="publish-article-title">编辑文章</div>
        <div class="putlish-article-content">
            <div class="left-content">
                <text-content :title="title" :content="content" :cover="cover" @publishArticle="changeArticle" />
                <p class="putlish-article-btn">
                    <button @click="publishArticle">发布文章</button>
                </p>
            </div>
            <div class="right-content">
                <p class="title">分类</p>
                <p class="select">当前选择分类：{{selectType.title ? selectType.title : '暂未选择'}}</p>
                <ul>
                    <li @click="selectType = item" :class="{'active':item.title === selectType.title}" v-for="item in articleTypeList" :key="item.id">
                        {{ item.title }}
                    </li>
                </ul>
                <p class="title">标签</p>
                <p class="select">当前选择标签：{{selectLabel.title ? selectLabel.title : '暂未选择'}}</p>
                <ul class="label-list">
                    <li @click="selectLabel = item" :class="{'active':item.title === selectLabel.title}" v-for="item in labelList" :key="item.id">
                        {{ item.title }}
                    </li>
                </ul>
                <p class="title">权限控制</p>
                <p class="permissions">
                    <input type="checkbox" id="comment" v-model="isComment"><label for="comment">允许评论</label>
                </p>
                <p class="permissions">
                    <input type="checkbox" id="isTop" v-model="isTop"><label for="isTop">是否置顶</label>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import TextContent from '../../components/TextContent';
    export default {
        data() {
            return {
                title: '',
                content: '',
                cover: '',
                articleTypeList: [],
                labelList: [],
                selectType: '',
                selectLabel: '',
                isComment: true,
                isTop: false,
                message: '',
                showMessage: false,
                editData: {}
            }
        },
        components: {
            TextContent
        },
        async created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000)
            if (this.$route.params.data) {
                const result = this.$route.params.data;
                this.editData = result;
                this.title = result.title;
                this.content = result.content;
                this.cover = result.cover;
                this.selectType = result.ArticleType;
                this.selectLabel = result.Label;
                this.isComment = result.isComment ? true : false;
                this.isTop = result.isTop ? true : false;
            } else {
                this.$router.push('/admin/articleManage');
            }
            this.articleTypeList = await this.$api.getAritcleTypeList();
            this.labelList = await this.$api.getLabelList();
        },
        methods: {
            changeArticle(data) {
                this.title = data.title;
                this.content = data.content;
                this.cover = data.cover;
            },
            async publishArticle() {
                if (this.title != "" && this.content != "" && this.cover != "" && this.selectLabel != "" && this.selectType != "") {
                    const result = await this.$api.updateAritcle(this.editData.id, {
                        title: this.title,
                        content: this.content,
                        cover: this.cover,
                        browse: 0,
                        isComment: this.isComment ? 1 : 0,
                        isTop: this.isTop ? 1 : 0,
                        UserId: 1,
                        ArticleTypeId: this.selectType.id + "",
                        LabelId: this.selectLabel.id + ""
                    })
                    if (result) {
                        this.sendMessage("发布成功！");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000)
                    } else {
                        this.sendMessage("发布失败，请检查后再提交！")
                    }
                } else {
                    this.sendMessage("输入信息不完整！")
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
    }
</script>

<style lang="scss">
    .publish-article {
        width: 1000px;
        margin: 0 auto;
        padding-top: 40px;

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

        .publish-article-title {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .putlish-article-content {
            overflow: hidden;

            .left-content {
                width: 70%;
                float: left;

                .putlish-article-btn {
                    margin-top: 30px;
                    text-align: right;

                    button {
                        width: 100px;
                        height: 30px;
                        background: #467B96;
                        border: none;
                        outline: none;
                        color: #fff;
                        cursor: pointer;

                        &:hover {
                            background: #3d6a81;
                        }
                    }
                }
            }

            .right-content {
                width: 30%;
                float: left;
                padding: 0 30px;
                box-sizing: border-box;

                .title {
                    font-weight: bold;
                    font-size: 14px;
                }

                .select {
                    margin: 10px 0;
                    font-size: 12px;
                    color: #999;
                }

                ul {
                    overflow: hidden;
                    margin-bottom: 20px;

                    li {
                        cursor: pointer;
                        float: left;
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
                        margin: 5px 3px;

                        &.active {
                            background: #a6acad;
                        }
                    }
                }

                .permissions {
                    margin: 10px 0;
                    font-size: 14px;
                    color: #999;

                    input {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>