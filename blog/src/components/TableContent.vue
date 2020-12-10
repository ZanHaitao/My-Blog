<template>
    <div class="table-content">
        <div class="delete-tip" :class="{'show':showDeleteTip}">
            <p class="title">是否确认删除？</p>
            <p class="btn">
                <button class="cancel" @click="handleTip(false)">取消</button>
                <button class="submit" @click="handleTip(true)">确认</button>
            </p>
        </div>
        <div class="edit-tip" :class="{ 'title': type === '标签' || type === '分类' || type === '每日一句','show':showEditTip}">
            <template v-if="type === '评论'">
                <p class="title">评论内容</p>
                <p class="content" :title="editData.content">{{ editData.content }}</p>
                <p class="title">回复内容</p>
            </template>
            <template v-if="type === '标签' || type === '分类'">
                <p class="title">编辑标题</p>
            </template>
            <template v-if="type === '每日一句'">
                <p class="title">编辑内容</p>
            </template>

            <p class="input">
                <input type="text" v-model="content">
            </p>
            <p class="btn">
                <button class="cancel" @click="handleTip(false)">取消</button>
                <button class="submit" @click="clickEdit">确认</button>
            </p>
        </div>
        <div class="bg" @click="handleTip(false)" :class="{'show':showBg}"></div>
        <table class="table" v-if="type === '文章'">
            <thead class="table-header">
                <td>标题</td>
                <td>作者</td>
                <td>分类</td>
                <td>时间</td>
                <td>操作</td>
            </thead>
            <tr class="table-body" v-for="item in dataList" :key="item.id">
                <td class="title" :title="item.title">{{ item.title }}</td>
                <td class="user-name">{{ item.User.userName }}</td>
                <td class="article-type">{{ item.ArticleType.title }}</td>
                <td class="publish-date">{{ getDate(item.createdAt) }}</td>
                <td class="handle">
                    <button class="edit" @click="handleEdit(item)">编辑</button>
                    <button class="delete" @click="handleDelete(item)">删除</button>
                </td>
            </tr>
        </table>
        <table class="table" v-if="type === '页面'">
            <thead class="table-header">
                <td>标题</td>
                <td>页面名称</td>
                <td>时间</td>
                <td>操作</td>
            </thead>
            <tr class="table-body" v-for="item in dataList" :key="item.id">
                <td class="title">{{ item.title }}</td>
                <td class="page-name">{{ item.pageName }}</td>
                <td class="publish-date">{{ getDate(item.createdAt) }}</td>
                <td class="handle">
                    <button class="edit" @click="handleEdit(item)">编辑</button>
                    <button class="delete" @click="handleDelete(item)">删除</button>
                </td>
            </tr>
        </table>
        <table class="table" v-if="type === '分类' || type === '标签'">
            <thead class="table-header">
                <td>标题</td>
                <td>时间</td>
                <td>操作</td>
            </thead>
            <tr class="table-body" v-for="item in dataList" :key="item.id">
                <td>{{ item.title }}</td>
                <td class="publish-date">{{ getDate(item.createdAt) }}</td>
                <td class="handle">
                    <button class="edit" @click="handleEdit(item)">编辑</button>
                    <button class="delete" @click="handleDelete(item)">删除</button>
                </td>
            </tr>
        </table>
        <table class="table" v-if="type === '每日一句'">
            <thead class="table-header">
                <td>标题</td>
                <td>时间</td>
                <td>操作</td>
            </thead>
            <tr class="table-body" v-for="item in dataList" :key="item.id">
                <td class="title">{{ item.content }}</td>
                <td class="publish-date">{{ getDate(item.createdAt) }}</td>
                <td class="handle">
                    <button class="edit" @click="handleEdit(item)">编辑</button>
                    <button class="delete" @click="handleDelete(item)">删除</button>
                </td>
            </tr>
        </table>
        <table class="table" v-if="type === '评论'">
            <thead class="table-header">
                <td>用户名</td>
                <td>内容</td>
                <td>文章标题</td>
                <td>邮箱</td>
                <td>时间</td>
                <td>操作</td>
            </thead>
            <tr class="table-body" v-for="item in dataList" :key="item.id">
                <td class="title">{{ item.userName }}</td>
                <td class="content" :title="item.content">{{ item.content }}</td>
                <td class="title" :title="item.Article.title">{{ item.Article.title }}</td>
                <td class="email" :title="item.email">{{ item.email }}</td>
                <td class="publish-date">{{ getDate(item.createdAt) }}</td>
                <td class="handle">
                    <button class="edit" @click="handleEdit(item)">回复</button>
                    <button class="delete" @click="handleDelete(item)">删除</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import moment from "moment";
    export default {
        props: {
            dataList: {
                type: Array,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                showDeleteTip: false,
                showBg: false,
                deleteData: '',
                editData: {},
                content: '',
                showEditTip: false
            }
        },
        methods: {
            getDate(date) {
                return moment(date).local().format('YYYY/MM/DD')
            },
            handleEdit(data) {
                if (this.type === "文章" || this.type === "页面") {
                    this.$emit('handleEdit', data);
                } else {
                    this.editData = data;

                    if (this.type === "每日一句") {
                        this.content = data.content
                    } else {
                        this.content = data.title
                    }
                    this.showEditTip = true;
                    this.showBg = true;
                }
            },
            handleDelete(data) {
                this.showDeleteTip = true;
                this.showBg = true;
                this.deleteData = data;
            },
            handleTip(flag) {
                if (flag) {
                    this.$emit('handleDelete', this.deleteData);
                }
                this.deleteData = '';
                this.showDeleteTip = false;
                this.showEditTip = false;
                this.showBg = false;
            },
            clickEdit() {
                if (this.type === "评论") {
                    this.$emit('handleEdit', this.editData, this.content);
                } else if (this.type === "分类" || this.type === "标签") {
                    this.editData.title = this.content;
                    this.$emit('handleEdit', this.editData);
                } else {
                    this.editData.content = this.content;
                    this.$emit('handleEdit', this.editData);
                }
                this.handleTip(false);
            }
        },
    }
</script>

<style lang="scss">
    .table-content {
        width: 100%;
        padding: 20px 40px;
        box-sizing: border-box;
        background: #fff;

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

        .edit-tip {
            position: fixed;
            width: 600px;
            height: 270px;
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

            &.title {
                height: 200px;
            }

            .title {
                font-weight: bold;
                margin: 30px 0 10px;
            }

            .content {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #999;
                line-height: 20px;
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

        .delete-tip {
            position: fixed;
            width: 300px;
            height: 100px;
            background: #fff;
            border-radius: 3px;
            left: calc(50% - 150px);
            z-index: 99;
            top: -100%;
            transition: top .5s;

            &.show {
                top: calc(50% - 50px);
            }

            .title {
                margin-top: 20px;
                font-weight: bold;
                margin-left: 20px;
            }

            .btn {
                text-align: right;
                margin-top: 20px;
                padding-right: 15px;

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

        .table {
            width: 100%;

            .table-header {
                font-weight: bold;

                td {
                    line-height: 40px;

                    text-align: center;
                }
            }

            .table-body {
                color: #467B96;
                line-height: 40px;

                &:hover {
                    background-color: #F6F6F3;
                }

                td {
                    border-top: 1px solid #F0F0EC;
                    font-size: 14px;
                    text-align: center;
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }

                    &.title {
                        text-align: left;
                        max-width: 150px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    &.content {
                        max-width: 100px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: left;
                    }

                    &.email {
                        max-width: 50px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: left;
                    }

                    &.publish-date {
                        color: #444;

                        &:hover {
                            text-decoration: none;
                        }
                    }

                    &.handle {
                        button {
                            border: none;
                            padding: 4px 8px;
                            color: #fff;
                            cursor: pointer;
                            outline: none;
                        }

                        .edit {
                            margin-right: 5px;
                            background: rgb(100, 148, 28);
                        }

                        .delete {
                            margin-left: 5px;
                            background: rgb(182, 18, 18);
                        }
                    }
                }
            }
        }
    }
</style>