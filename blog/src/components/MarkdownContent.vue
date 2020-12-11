<template>
    <div class="article-content-body">
        <div class="content" v-html="code"></div>
        <div class="img">
            <img src="https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/uploads/2020/02/1583515138.gif" alt="">
        </div>
        <div class="footer">
            <span class="icon el-icon-time"></span>
            <span>最后修改：</span>
            <span class="text">{{ getDate() }}</span>
            <span style="float:right">© 允许规范转载</span>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import hljs from "highlight.js";
    import javascript from 'highlight.js/lib/languages/javascript';
    import 'highlight.js/styles/monokai-sublime.css';
    import moment from 'moment';
    export default {
        props: {
            contentData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                code: ''
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getDate() {
                return moment(this.contentData.updatedAt).local().format('YYYY年MM月DD日 HH:mm A');
            },
            getData() {
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    highlight: function(code) {
                        return hljs.highlightAuto(code).value;
                    },
                    pedantic: false,
                    gfm: true,
                    tables: true,
                    breaks: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false,
                    xhtml: false
                });
                this.code = marked(this.contentData.content)
            }
        },
        watch: {
            contentData() {
                this.getData();
            }
        },
    }
</script>


<style lang="scss">
    .article-content-body {
        background: #fff;
        padding: 30px;
        border-radius: 2px;
        margin-top: 20px;
        line-height: 30px;
        font-size: 14px;
        color: #777;
        overflow: hidden;

        .img {
            img {
                border: none;
            }
        }

        .footer {
            .icon {
                margin-right: 5px;
            }
        }

        p {
            margin: 15px 0;
        }

        .content {
            padding-bottom: 40px;
            margin-bottom: 20px;
            border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.05);
        }

        .content {
            width: 100%;
        }

        pre {
            width: 95%;
            margin: 20px auto;
            background: #282C34;
            border-top: 30px solid #161616;
            border-radius: 5px;
            max-height: 300px;
            position: relative;
            box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);

            &::after {
                content: '';
                position: absolute;
                top: -20px;
                left: 40px;
                width: 13px;
                height: 13px;
                background: #35CD4B;
                border-radius: 50%;
                z-index: 10;
            }

            &::before {
                content: '';
                position: absolute;
                top: -20px;
                left: 20px;
                width: 13px;
                height: 13px;
                background: #FC625D;
                border-radius: 50%;
                z-index: 10;
            }


        }

        code {
            display: block;
            padding: 20px;
            max-height: 300px;
            overflow: scroll;
            width: 100%;
            color: #fff;
            box-sizing: border-box;

            &::-webkit-scrollbar {
                /*滚动条样式*/
                width: 7px;
                height: 0px;
            }

            &::-webkit-scrollbar-thumb {
                /*滑块的样式*/
                border-radius: 7px;
                background: #d1d4db;
            }
        }

        strong {
            font-weight: bold;
        }

        em {
            font-style: italic;
        }

        blockquote {
            background: #F1F3F4;
            border-left: 4px solid #cecece;
            padding: 10px;
            color: #777;
        }

        img {
            width: 80%;
            margin: 20px auto;
            border: 3px solid rgb(221, 216, 216);
            border-radius: 5px;
            box-sizing: border-box;
            transition: box-shadow .5s;
            display: block;
        }

        ol {
            list-style: decimal;
            padding-left: 20px;
        }

        ul {
            list-style: disc;
            padding-left: 20px;
        }

        h1 {
            font-size: 2em;
            padding-left: 25px;

        }

        h2 {
            font-size: 1.5em;
            padding-left: 20px;
        }

        h3 {
            font-size: 1.17em;
            padding-left: 15px;
        }

        h4 {
            font-size: 1em;
            padding-left: 12px;
        }

        h5 {
            font-size: 0.83em;
            padding-left: 10px;
        }

        h6 {
            font-size: 0.67em;
            padding-left: 10px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            position: relative;
            font-weight: bold;
            margin: 20px 0;

            &::after {
                content: '#';
                position: absolute;
                left: 0px;
            }
        }

        hr {
            border-color: rgba($color: #000000, $alpha: 0.05);
        }
    }
</style>