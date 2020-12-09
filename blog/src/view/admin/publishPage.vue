<template>
    <div class="publish-page">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="publish-page-title">创建新页面</div>
        <div class="publish-page-content">
            <text-content :title="title" :content="content" :cover="cover" @publishArticle="changePage" />
            <p class="page-name">
                <input type="text" v-model="pageName" placeholder="页面分类名称">
            </p>
            <p class="page-describe">
                <input type="text" v-model="describe" placeholder="页面描述">
            </p>
            <p class="putlish-page-btn">
                <button @click="publishArticle">发布页面</button>
            </p>
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
                message: '',
                showMessage: false,
                pageName: '',
                describe: ''
            }
        },
        components: {
            TextContent,
        },
        methods: {
            changePage(data) {
                this.title = data.title;
                this.content = data.content;
                this.cover = data.cover;
            },
            async publishArticle() {
                if (this.title != "" && this.content != "" && this.cover != "" && this.pageName != "" && this.describe != "") {
                    const result = await this.$api.addPage({
                        title: this.title,
                        content: this.content,
                        cover: this.cover,
                        pageName: this.pageName,
                        describe: this.describe
                    });
                    if (result) {
                        this.sendMessage("发布成功！");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000)
                    } else {
                        this.sendMessage("发布失败，请检查后再提交！")
                    }
                } else {
                    this.sendMessage("填写信息不完整！")
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
    .publish-page {
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

        .publish-page-title {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .publish-page-content {
            overflow: hidden;

            .page-name,
            .page-describe {
                input {
                    height: 36px;
                    width: 100%;
                    font-weight: bold;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border: 1px solid #D9D9D6;
                    margin-top: 10px;
                }
            }

            .putlish-page-btn {
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
    }
</style>