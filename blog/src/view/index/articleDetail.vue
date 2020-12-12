<template>
    <div class="article-detail">
        <template v-if="articleData">
            <div class="message-tip" :class="{'active':showMessage}">{{ message }}</div>
            <div class="publish-tip" :class="{'show':showPublishTip}">
                <div class="title">发表评论</div>
                <p class="must">评论</p>
                <p class="text-content">
                    <textarea placeholder="评论内容(必填)" v-model="replyContent"></textarea>
                </p>
                <div class="input-content">
                    <div>
                        <p class="must">名称</p>
                        <p><input type="text" placeholder="姓名或昵称(必填)" v-model="replyUserName"></p>
                    </div>
                    <div>
                        <p class="must">邮箱</p>
                        <p><input type="text" placeholder="邮箱(必填)" v-model="replyEmail"></p>
                    </div>
                </div>
                <p class="btn">
                    <button @click="publishReply">发表评论</button>
                    <button class="cancel" @click="cancelPublishReply">取消</button>
                </p>
            </div>
            <div class="article-detail-header">
                <template v-if="articleData">
                    <p class="title"># {{ articleData.title }}</p>
                    <p class="info">
                        <span class="icon el-icon-user"></span>
                        <span class="text">{{ articleData.User.userName }}</span>
                        <span class="icon el-icon-time"></span>
                        <span class="text">{{ getDate(articleData.createdAt) }}</span>
                        <span class="icon el-icon-chat-square"></span>
                        <span class="text" v-if="articleData.isComment">{{ articleData.commentCount ? articleData.commentCount : '暂无评论' }}</span>
                        <span class="text" v-else>关闭评论</span>
                        <span class="icon el-icon-view"></span>
                        <span class="text">{{ articleData.browse }}次浏览</span>
                        <span class="icon el-icon-collection-tag"></span>
                        <span class="text">{{ articleData.ArticleType.title }}</span>
                        <span class="icon el-icon-sugar"></span>
                        <span class="text">{{ articleData.Label.title }}</span>
                    </p>
                </template>
            </div>
            <div class="article-detail-content">
                <div class="article-content-header">
                    <span class="icon el-icon-house"></span>
                    <router-link to="/" tag="span" class="btn" title="返回首页">首页</router-link>
                    <span>/</span>
                    <span>正文</span>
                </div>
                <template v-if="articleData">
                    <markdown-content :contentData="articleData"></markdown-content>
                </template>

                <div class="article-content-footer">
                    <template v-if="articleData.isComment">
                        <p class="title">{{articleData.commentCount}}条评论</p>

                        <ul class="comment-content">
                            <template v-if="commentData.data">
                                <li class="tip" v-if="commentData.data.length === 0">
                                    暂无评论
                                </li>
                            </template>

                            <li v-for="item in commentData.data" :key="item.id">
                                <div class="portrait" v-once :style="{'background-image':'url('+getPortrait()+')'}">
                                </div>
                                <div class="info">
                                    <p class="user-name">{{ item.userName }}</p>
                                    <p class="date">{{ getDate(item.createdAt) }}</p>
                                    <p class="comment-text" :title="item.content">{{ item.content }}</p>
                                    <p class="btn">
                                        <button @click="handleReply(item)">回复</button>
                                    </p>
                                    <ul>
                                        <li v-for="reply in item.Reply" :key="reply.id" class="reply">
                                            <div class="portrait" v-once :style="{'background-image':`url(${reply.type === 'admin' ? articleData.User.userPortrait : getPortrait()})`}">
                                            </div>
                                            <div class="info">
                                                <p class="user-name" :class="{ 'blogger': reply.type === 'admin' }" :title="reply.type === 'admin' ? '博主':''">{{ reply.userName }}</p>
                                                <p class="date">{{ getDate(reply.createdAt) }}</p>
                                                <p class="comment-text" :title="reply.content">{{ reply.content }}</p>
                                                <p class="btn">
                                                    <button @click="handleReply(item)">回复</button>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div class="tip">此文章评论已关闭</div>
                    </template>
                </div>
                <template v-if="commentData.count && articleData.isComment && (commentData.count / limit) > 1">
                    <my-pagination :page="page" :limit="limit" :count="commentData.count" @changePage="changePage" />
                </template>

                <template v-if="articleData.isComment">
                    <div class="publish-comment">
                        <div class="title">发表评论</div>
                        <p class="must">评论</p>
                        <p class="text-content">
                            <textarea placeholder="评论内容(必填)" v-model="commentContent"></textarea>
                        </p>
                        <div class="input-content">
                            <div>
                                <p class="must">名称</p>
                                <p><input type="text" placeholder="姓名或昵称(必填)" v-model="userName"></p>
                            </div>
                            <div>
                                <p class="must">邮箱</p>
                                <p><input type="text" placeholder="邮箱(必填)" v-model="email"></p>
                            </div>
                        </div>
                        <p class="btn">
                            <button @click="publishComment">发表评论</button>
                        </p>
                    </div>
                </template>
            </div>
        </template>

    </div>
</template>

<script>
    import moment from 'moment';
    import MarkdownContent from '@/components/MarkdownContent';
    import MyPagination from '@/components/Pagination';
    export default {
        data() {
            return {
                articleData: "",
                commentData: '',
                page: 1,
                limit: 10,
                showPublishTip: false,
                content: '',
                commentContent: '',
                userName: '',
                email: '',
                message: '',
                showMessage: false,
                replyContent: '',
                replyUserName: '',
                replyEmail: '',
                Reply: ''
            }
        },
        components: {
            MarkdownContent,
            MyPagination
        },
        async created() {
            if (this.$route.params.id) {
                this.getData();
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                const timeTop = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
            } else {
                this.$router.push('/');
            }
        },
        methods: {
            async getData() {
                this.$store.dispatch('changeLoading', true);
                this.articleData = await this.$api.getArticle(this.$route.params.id);
                this.getComment();
                this.$store.dispatch('changeLoading', false);
            },
            async publishReply() {
                if (this.replyContent != "" && this.replyUserName != "" && this.replyEmail != "") {
                    const result = await this.$api.addReply({
                        content: this.replyContent,
                        userName: this.replyUserName,
                        email: this.replyEmail,
                        CommentId: this.Reply.id,
                        type: 'user'
                    })
                    if (result) {
                        this.sendMessage('回复成功！');
                        this.getComment();
                        this.cancelPublishReply();
                    } else {
                        this.sendMessage('回复失败！')
                    }
                } else {
                    this.sendMessage('输入信息不完整！')
                }
            },
            handleReply(Reply) {
                this.Reply = Reply;
                this.showPublishTip = true;
            },
            cancelPublishReply() {
                this.showPublishTip = false;
                this.replyContent = "";
                this.replyUserName = "";
                this.replyEmail = "";
                this.Reply = "";
            },
            async publishComment() {
                if (this.commentContent != "" && this.userName != "" && this.email != "") {
                    const result = await this.$api.addComment({
                        content: this.commentContent,
                        userName: this.userName,
                        email: this.email,
                        ArticleId: this.articleData.id
                    })
                    if (result) {
                        this.sendMessage('发表成功！');
                        this.getComment();
                        this.commentContent = "";
                        this.userName = "";
                        this.email = "";
                    } else {
                        this.sendMessage('发表失败！')
                    }
                } else {
                    this.sendMessage('输入信息不完整！')
                }
            },
            getDate(date) {
                return moment(date).local().format('YYYY年MM月DD日');
            },
            changePage(page) {
                this.page = page;
            },
            async getComment() {
                if (this.articleData.isComment) {
                    this.commentData = await this.$api.getCommentList({
                        limit: this.limit,
                        page: this.page,
                        ArticleId: this.articleData.id,
                        order: 1
                    })
                    this.$set(this.articleData, 'commentCount', this.commentData.count);
                    this.commentData.data.forEach(async (item, index) => {
                        const result = (await this.$api.getReply({
                            CommentId: item.id,
                            limit: 999
                        })).data;
                        this.$set(this.commentData.data[index], 'Reply', result);
                    })
                }
            },
            sendMessage(content) {
                this.showMessage = true;
                this.message = content;
                setTimeout(() => {
                    this.showMessage = false;
                    this.message = "";
                }, 3000)
            },
            getPortrait() {
                const portraitArr = [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854059&di=708a80cd7c72aa79a2b49b0e323ec23d&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F66b6e1c4ly1gh97e6r3s8j21tm1tmq6d.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854200&di=9f32e8bd65aca18033ea6635f23ce7e4&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-12%2F202012102240826208.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854200&di=ae131295d753571d1f74655e0a5ce929&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-12%2F202012102240462153.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854199&di=272e26faec2ddd1223aea36f12a5a4a0&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-12%2F2020121022441381077.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687879793&di=461d0d347486ee905bafb47094984039&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F05%2F20180605193845_kmhss.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854199&di=38ed009ec2662363acf73f91454df8f5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201903%2F15%2F20190315004339_nWjPf.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854199&di=cb47e809aecf21071995856271fcdd50&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F01%2F20151001174653_L3wEF.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687899057&di=456bc7083e115d14dca692d11314157e&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9702170888%2F1000.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854198&di=bb75979c7c5ec64fa659ee6ab82fe414&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854198&di=02153ffa4d63613839f6e4c1304e5759&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F25%2F20190125131827_tphtb.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854198&di=301ca314a2000d74d7326684850bd09c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn19%2F0%2Fw400h400%2F20180910%2F3391-hiycyfw5413589.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854198&di=8724d951c577fd5ea5891a2cf4c13458&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F24%2F20140824154253_45Hay.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687932297&di=ba7eac4b02ec7b981510eecf6eea3cfb&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D580e773405f431adbcd243317b37ac0f%2F50f2f9dde71190ef9c7f0079c71b9d16fffa60dc.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854197&di=890d1590edc5051b2c7eb8b5e6bc5cb8&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Da587b23df11f3a295a9dddcaac159007%2F500fd9f9d72a60590cfef2f92934349b023bba62.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854197&di=3993d578dfe6d0274f8897ea9a43923e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F22%2F20151222223118_tnvcX.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854197&di=390450a87985b19b461845785ec0a868&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F19%2F20171219234358_VRdrH.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854196&di=bc1a6f79ec427495c05edc333708f816&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F15%2F20171215221023_KiYWM.thumb.700_0.jpeg',
                    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854196&di=f6909987e5505bd3b45c265d87c22878&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180805%2F4d3f1dbaa59b4502adf99343a8824edb.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687976706&di=dc2b06563eb0f5df31eda98e57d21203&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dabbf8f972d738bd4c421b239918b876c%2F8169ca8065380cd7e02852a7a244ad3459828159.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854195&di=f128ece840064ae5c226f1b12df787ff&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff331c6a4056b8fc7766941647aa3534927ce0005c5c5-b9WRQf_fw658',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854194&di=9484da60ce0ee0f6a5d9dc67117fc8b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F17%2F20190217231515_ixMhS.thumb.700_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607687854208&di=6335aab87616295d0f9190fefb287e95&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F20%2F20150920105348_38Ewf.jpeg'
                ]
                return portraitArr[Math.floor(Math.random() * portraitArr.length)];
            },
            showTip() {
                this.showPublishTip = true;
                this.showBg = true;
            },
            hideTip() {
                this.showPublishTip = false;
                this.showBg = false;
            },
            async clickPublish() {
                const result = await this.$api.addEveryDay({
                    content: this.content
                })

                if (result) {
                    this.sendMessage("添加成功！");
                    this.hideTip();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    this.sendMessage("添加失败！")
                }
            },
        },
        watch: {
            page() {
                this.getComment();
            },
            $route() {
                this.getData();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .message-tip {
        position: fixed;
        width: 200px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        background: #fff;
        left: calc(50% - 100px);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
        font-size: 14px;
        color: #ED925B;
        transition: top .5s;
        top: -100%;
        z-index: 99999;

        &.active {
            top: calc(50% - 15px);
        }
    }

    .publish-tip {
        position: fixed;
        width: 800px;
        height: 340px;
        background: #fff;
        border-radius: 3px;
        left: calc(50% - 410px);
        z-index: 9999;
        padding: 20px 30px;
        box-sizing: border-box;
        top: -100%;
        transition: top .5s;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);

        &.show {
            top: calc(50% - 200px);
        }

        background: #fff;
        padding: 20px;
        margin-top: 20px;
        border-radius: 2px;

        &>.title {
            color: #777;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .text-content {
            textarea {
                width: 100%;
                height: 100px;
                resize: none;
                padding: 10px;
                box-sizing: border-box;
                border: 1px solid #D9D9D6;
            }
        }

        .input-content {
            overflow: hidden;

            &>div {
                float: left;
                width: 50%;

                input {
                    height: 30px;
                    border: none;
                    outline: none;
                    padding: 0 10px;
                    width: 80%;
                    border: 1px solid #D9D9D6;
                }
            }
        }

        .btn {
            margin-top: 20px;

            button {
                color: #fff;
                border: none;
                background: #448bff linear-gradient(45deg, #448bff, #44e9ff);
                outline: none;
                cursor: pointer;
                height: 30px;
                padding: 0 25px;
                border-radius: 15px;
                transition: all .2s ease;

                &:hover {
                    color: #f4f4f4;
                    opacity: .8;
                }

                &.cancel {
                    background: #a0a0a0;
                    float: right;
                }
            }

        }

        .must {
            color: #777;
            font-size: 14px;
            position: relative;
            margin: 10px 0;

            &::after {
                content: '*';
                position: absolute;
                left: 30px;
                color: #f05050;
            }
        }
    }

    .article-detail-header {
        height: 120px;
        width: 100%;
        background: #F9F9F9;
        padding: 20px;
        box-sizing: border-box;

        .title {
            font-weight: 300;
            font-size: 30px;
            padding: 15px 0 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .info {
            color: #a0a0a0;
            font-size: 14px;
            line-height: 20px;

            .icon {
                margin-right: 5px;
            }

            .text {
                margin-right: 10px;
            }
        }
    }

    .article-detail-content {
        padding: 20px;
        box-sizing: border-box;

        .article-content-header {
            background: #fff;
            padding: 10px 15px;
            font-size: 14px;
            color: #777;
            border-radius: 2px;

            span {
                margin-right: 10px;

                &.icon {
                    margin-right: 2px;
                }

                &.btn {
                    cursor: pointer;
                }
            }
        }

        .publish-comment {
            background: #fff;
            padding: 20px;
            margin-top: 20px;
            border-radius: 2px;

            &>.title {
                color: #777;
                font-size: 18px;
                margin-bottom: 20px;
            }

            .text-content {
                textarea {
                    width: 100%;
                    height: 100px;
                    resize: none;
                    padding: 10px;
                    box-sizing: border-box;
                    border: 1px solid #D9D9D6;
                }
            }

            .input-content {
                overflow: hidden;

                &>div {
                    float: left;
                    width: 50%;

                    input {
                        height: 30px;
                        border: none;
                        outline: none;
                        padding: 0 10px;
                        width: 80%;
                        border: 1px solid #D9D9D6;
                    }
                }
            }

            .btn {
                margin-top: 10px;

                button {
                    color: #fff;
                    border: none;
                    background: #448bff linear-gradient(45deg, #448bff, #44e9ff);
                    outline: none;
                    cursor: pointer;
                    height: 30px;
                    padding: 0 25px;
                    border-radius: 15px;
                    transition: all .2s ease;

                    &:hover {
                        color: #f4f4f4;
                        opacity: .8;
                    }
                }
            }

            .must {
                color: #777;
                font-size: 14px;
                position: relative;
                margin: 10px 0;

                &::after {
                    content: '*';
                    position: absolute;
                    left: 30px;
                    color: #f05050;
                }
            }
        }

        .article-content-footer {
            margin-top: 20px;
            background: #fff;
            padding: 20px;
            border-radius: 2px;

            .title {
                margin-bottom: 30px;
                font-size: 18px;
                color: #777;
            }

            .tip {
                text-align: center;
                font-size: 14px;
                color: #777;
            }

            .comment-content {
                margin-top: 20px;

                &>li {
                    padding-bottom: 20px;
                    border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

                    &:last-child {
                        border: none;
                    }
                }

                li {
                    overflow: hidden;
                    margin-bottom: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .reply {
                        width: 100%;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px dashed rgba(0, 0, 0, 0.2);
                    }

                    .portrait {
                        width: 40px;
                        height: 40px;
                        float: left;
                        background-size: cover;
                        border-radius: 5px;

                    }

                    .info {
                        float: left;
                        margin-left: 10px;
                        width: calc(100% - 50px);

                        .user-name {
                            color: #777;
                            font-weight: 700;
                            font-size: 14px;

                            &.blogger {
                                color: #FEB356;
                                cursor: pointer;
                                text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
                            }
                        }

                        .date {
                            font-size: 12px;
                            color: #a0a0a0;
                            margin: 10px 0;
                        }

                        .comment-text {
                            font-size: 14px;
                            color: #777;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            line-height: 20px;
                            margin-bottom: 10px;
                        }

                        .btn {
                            button {
                                border: none;
                                background: #23B7E5;
                                color: #fff;
                                padding: 3px 10px;
                                cursor: pointer;
                                border-radius: 2px;
                                outline: none;

                                &:hover {
                                    background: #19A9D5;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width:1800px) and (min-width:1200px) {
        .publish-tip {
            width: 670px;
            left: calc(50% - 345px);
        }
    }

    @media screen and (max-width:1200px) and (min-width:992px) {
        .publish-tip {
            width: 470px;
            left: calc(50% - 245px);
        }
    }

    @media screen and (max-width:992px) and (min-width:768px) {
        .publish-tip {
            width: 470px;
            left: calc(50% - 245px);
        }
    }

    @media screen and (max-width:768px) {
        .publish-tip {
            width: 80%;
            left: 10%;
        }
    }
</style>