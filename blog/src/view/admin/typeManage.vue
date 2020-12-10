<template>
    <div class="type-manage">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="publish-tip" :class="{'show':showPublishTip}">
            <p class="title">添加分类</p>
            <p class="input">
                <input type="text" v-model="title" placeholder="标题">
            </p>
            <p class="btn">
                <button class="cancel" @click="hideTip">取消</button>
                <button class="submit" @click="clickPublish">确认</button>
            </p>
        </div>
        <div class="bg" @click="hideTip" :class="{'show':showBg}"></div>
        <div class="type-manage-title">
            管理分类
            <span class="type-manage-publish" @click="showTip">新增</span>
        </div>
        <div class="type-manage-content">
            <template v-if="typeData.count">
                <table-content :dataList="typeData.data" :type="'分类'" @handleEdit="handleEdit" @handleDelete="handleDelete" />
                <my-pagination :page="page" :limit="limit" :count="typeData.count" @changePage="changePage" />
            </template>
        </div>
    </div>
</template>

<script>
    import TableContent from '@/components/TableContent';
    import MyPagination from '@/components/Pagination';
    export default {
        data() {
            return {
                message: '',
                showMessage: false,
                typeData: '',
                page: 1,
                limit: 10,
                showPublishTip: false,
                showBg: false,
                title: ''
            }
        },
        components: {
            TableContent,
            MyPagination
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000);

            this.getData();
        },
        methods: {
            async getData() {
                this.typeData = await this.$api.getAritcleTypeFindByPage({
                    page: this.page,
                    limit: this.limit
                });
            },
            changePage(page) {
                this.page = page;
            },
            async handleDelete(data) {
                const result = await this.$api.deleteAritcleType(data.id)
                if (result) {
                    this.sendMessage("删除成功！");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    this.sendMessage("删除失败！")
                }
            },
            async handleEdit(data) {
                const result = await this.$api.updateAritcleType(data.id, {
                    title: data.title,
                })
                if (result) {
                    this.sendMessage("修改成功！");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    this.sendMessage("修改失败！")
                }
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
                const result = await this.$api.addAritcleType({
                    title: this.title
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
            sendMessage(content) {
                this.showMessage = true;
                this.message = content;
                setTimeout(() => {
                    this.showMessage = false;
                    this.message = "";
                }, 3000)
            }
        },
        watch: {
            page() {
                this.getData();
            }
        },
    }
</script>

<style lang="scss">
    .type-manage {
        width: 1000px;
        margin: 50px auto 0;

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

        .bg {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #000;
            opacity: 0.5;
            z-index: 88;
            display: none;

            &.show {
                display: block;
            }
        }

        .publish-tip {
            position: fixed;
            width: 600px;
            height: 200px;
            background: #fff;
            border-radius: 3px;
            left: calc(50% - 300px);
            z-index: 99;
            padding: 20px 30px;
            box-sizing: border-box;
            top: -100%;
            transition: top .5s;

            &.show {
                top: calc(50% - 50px);
            }

            .title {
                font-weight: bold;
                margin: 30px 0 10px;
            }

            .input {
                input {
                    width: 100%;
                    height: 30px;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
            }

            .btn {
                text-align: right;
                margin-top: 30px;

                button {
                    border: none;
                    outline: none;
                    padding: 5px 10px;
                    color: #fff;
                    margin: 0 5px;
                    cursor: pointer;

                    &.submit {
                        background: rgb(28, 120, 240);
                    }

                    &.cancel {
                        background: rgb(143, 139, 139);
                    }
                }
            }
        }

        .type-manage-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;

            .type-manage-publish {
                font-size: 14px;
                display: inline-block;
                padding: 5px 5px;
                background: #E9E9E6;
                color: #467B96;
                margin-left: 10px;
                cursor: pointer;

                &:hover {
                    color: #499BC3;
                }
            }
        }
    }
</style>