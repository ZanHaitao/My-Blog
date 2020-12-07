<template>
    <div class="pagination">
        <span v-if="page > 3" class="icon el-icon-arrow-left" @click="changePage(page - 1)"></span>
        <span :class="{'active':page == 1}" @click="changePage(1)">1</span>
        <span v-if="page - 3 > 1">...</span>
        <template v-if="page > 2">
            <span v-if="page - 2 != 1" @click="changePage(page - 2)">{{page - 2}}</span>
            <span @click="changePage(page - 1)">{{page - 1}}</span>
        </template>
        <span class="active" v-if="page != 1 && page != maxPage">{{ page }}</span>
        <template v-if="page< maxPage - 1">
            <span @click="changePage(page + 1)">{{page + 1}}</span>
            <span v-if="page + 2 != maxPage" @click="changePage(page + 2)">{{page + 2}}</span>
        </template>
        <span v-if="page + 3 < maxPage">...</span>
        <span :class="{'active':page == maxPage}" @click="changePage(maxPage)">{{ maxPage }}</span>
        <span v-if="page < maxPage - 3" class="icon el-icon-arrow-right" @click="changePage(page + 1)"></span>
    </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: Number,
                required: true
            },
            limit: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        },
        computed: {
            maxPage() {
                return Math.ceil(this.count / this.limit);
            }
        },
        methods: {
            changePage(page){
                this.$emit('changePage',page);
            }
        },
    }
</script>

<style lang="scss">
    .pagination {
        margin: 50px 0;
        display: flex;
        justify-content: center;

        .icon {
            font-weight: bold;
        }

        span {
            font-size: 12px;
            -webkit-user-select: none;

            &.active {
                background-color: #000;
                color: #fff;
                &:hover{
                    background: #000;
                }
            }

            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            display: inline-block;
            cursor: pointer;
            background-color: #fff;

            &:hover {
                background-color: #EEEEEE;
            }

            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }
</style>