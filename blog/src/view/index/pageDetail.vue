<template>
    <div class="page-detail">
        <div class="page-detail-header">
            <template v-if="pageData">
                <p class="title"># {{ pageData.title }}</p>
                <p class="info">
                    <span class="text">{{ pageData.describe }}</span>
                </p>
            </template>
        </div>
        <div class="page-detail-content">
            <div class="page-content-header">
                <span class="icon el-icon-house"></span>
                <router-link to="/" tag="span" class="btn" title="返回首页">首页</router-link>
                <span>/</span>
                <span>{{ pageData.title }}</span>
            </div>
            <template v-if="pageData">
                <div class="cover" :style="{'background-image':'url('+pageData.cover+')'}"></div>
                <markdown-content :contentData="pageData"></markdown-content>
            </template>
        </div>
    </div>
</template>

<script>
    import MarkdownContent from '@/components/MarkdownContent';
    export default {
        data() {
            return {
                pageData: ''
            }
        },
        components: {
            MarkdownContent
        },
        created() {
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
                this.pageData = await this.$api.getPageById(this.$route.params.id);
                this.$store.dispatch('changeLoading', false);
            }
        },
        watch: {
            $route() {
                this.getData();
            }
        },
    }
</script>

<style lang="scss">
    .page-detail {
        .page-detail-header {
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                .text {
                    margin-right: 10px;
                }
            }
        }

        .page-detail-content {
            padding: 20px;
            box-sizing: border-box;

            .page-content-header {
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

            .cover {
                width: 100%;
                height: 260px;
                margin-bottom: -20px;
                margin-top: 20px;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                background-position: center;
                background-size: cover;
            }
        }
    }
</style>