<template>
    <div class="text-content">
        <p class="title">
            <input v-model="articleTitle" placeholder="标题" type="text">
        </p>
        <p class="function">
            <ul>
                <li @click="appendText('**加粗文字**')" class="iconfont icon-bold" title="加粗"></li>
                <li @click="appendText('*斜体文字*')" class="iconfont icon-xieti" title="斜体"></li>
                <li @click="appendText('\n> 引用文字')" class="iconfont icon-yinyong" title="引用"></li>
                <li @click="appendText('\n```javascript\n\n代码片段\n\n```')" class="iconfont icon-ai-code" title="代码"></li>
                <li @click="appendText('\n![avatar](图片链接地址)\n')" class="iconfont icon-tupian" title="图片"></li>
                <li @click="appendText('\n 1. 列表项目\n')" class="iconfont icon-numberlist" title="有序列表"></li>
                <li @click="appendText('\n - 列表项目\n')" class="iconfont icon-liebiao" title="无序列表"></li>
                <li @click="appendText('\n## 标题文字 ##\n')" class="iconfont icon-biaoti" title="标题"></li>
                <li @click="appendText('\n----------\n')" class="iconfont icon-fengexian1" title="分割线"></li>
                <li @click="appendText('\n<!--more-->\n')" class="iconfont icon-fengexian" title="摘要分割线"></li>
            </ul>
        </p>
        <p class="content">
            <textarea v-model="articleContent"></textarea>
            <input type="text" placeholder="封面" v-model="articleCover">
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            cover: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                articleTitle: this.title,
                articleContent: this.content,
                articleCover: this.cover,
            }
        },
        methods: {
            appendText(content) {
                this.articleContent += content;
            },
            changeInput() {
                this.$emit('publishArticle', {
                    title: this.articleTitle,
                    content: this.articleContent,
                    cover: this.articleCover
                })
            }
        },
        watch: {
            articleTitle() {
                this.changeInput();
            },
            articleContent() {
                this.changeInput();
            },
            articleCover(){
                this.changeInput();
            }
        },
    }
</script>

<style lang="scss">
    @import url('../assets/iconfont/iconfont.css');

    .text-content {
        .title {
            input {
                height: 36px;
                width: 100%;
                font-weight: bold;
                padding: 0 10px;
                box-sizing: border-box;
                border: 1px solid #D9D9D6;
                margin-bottom: 20px;
            }
        }

        .function {
            margin-bottom: 5px;

            ul {
                display: flex;
                justify-content: flex-start;

                li {
                    margin-right: 10px;
                    color: #999999;
                    cursor: pointer;
                    width: 30px;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;

                    &:hover {
                        background: #d8d8d8;
                    }
                }
            }
        }

        .content {
            textarea {
                width: 100%;
                height: 500px;
                resize: none;
                padding: 10px;
                box-sizing: border-box;
                border: 1px solid #D9D9D6;

                &::-webkit-scrollbar {
                    /*滚动条样式*/
                    width: 10px;
                    height: 0px;
                }

                &::-webkit-scrollbar-thumb {
                    /*滑块的样式*/
                    border-radius: 5px;
                    background: #d1d4db;
                }
            }

            input {
                height: 36px;
                width: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                border: 1px solid #D9D9D6;
                margin-top: 20px;
            }
        }
    }
</style>