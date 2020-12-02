<template>
    <div class="nav-bar">
        <div class="nav-title">{{ title }}</div>
        <ul>
            <li class="nav-item" v-for="item in listData" :key="item.id">
                <span class="item-title" @click="clickItem(item)">
                    {{item.title}}
                    <span v-if="item.children.length != 0 && item.active == false" class="icon el-icon-arrow-right"></span>
                    <span v-if="item.children.length != 0 && item.active == true" class="icon el-icon-arrow-down"></span>
                </span>

                <template v-if="item.active == true">
                    <ul>
                        <li class="show-item" v-for="page in item.children" :key="page.id">
                            <span class="item-title">{{ page.title }}</span>
                        </li>
                    </ul>
                </template>

            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            listData: {
                type: Array,
                required: true
            }
        },
        methods: {
            clickItem(item) {
                if (item.children.length != 0 && item.active == false) {
                    item.active = true;
                }else{
                    item.active = false;
                }

                if(item.children.length === 0){
                    console.log('111')
                }
            }
        },
    }
</script>

<style lang="scss">
    .nav-bar {
        width: 100%;
        padding-bottom: 10px;
        overflow: hidden;

        .nav-title {
            margin: 15px 20px;
            font-size: 12px;
            color: #98a6ad;
        }

        .nav-item {
            -webkit-user-select: none;
            .item-title {
                padding: 15px 0px 15px 50px;
                color: #777777;
                cursor: pointer;
                transition: all .3s;
                font-size: 14px;
                display: block;

                .icon {
                    float: right;
                    margin-right: 20px;
                }

                &:hover {
                    background-color: #ECECEC;
                }
            }

            .show-item {
                .item-title {
                    background: #FFFFFF;

                    &:hover {
                        background-color: #ECECEC;
                    }
                }
            }


        }
    }
</style>