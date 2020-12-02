<template>
    <div class="wrapper">
        <header class="header">
            <div class="logo">
                <img :src="config.logo" alt="">
            </div>
            <div @click="showAside = !showAside" class="show-aside">
                <span v-if="!showAside" class="el-icon-s-unfold"></span>
                <span v-else class="el-icon-s-fold"></span>
            </div>
        </header>
        <div class="container">
            <div class="aside" :class="{'aside-active':showAside}">
                <div class="aside-user border">
                    <p class="user-portrait">
                        <img :src="userInfo.userPortrait" alt="">
                    </p>
                    <p class="user-name">{{ userInfo.userName }}</p>
                    <p class="user-info">{{ userInfo.userInfo }}</p>
                </div>
                <div class="aside-nav">
                    <template v-if="pageList.length != 0">
                        <nav-menu class="border" :title="'导航'" :listData="pageList" />
                    </template>
                    <template v-if="AritcleType.length != 0">
                        <nav-menu :title="'组成'" :listData="AritcleType" />
                    </template>
                </div>
                <div class="aside-footer">
                    <p class="icon el-icon-setting"></p>
                    <p class="btn">管理</p>
                </div>
            </div>
            <div class="content">content</div>
        </div>
    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu';

    export default {
        data() {
            return {
                config: {},
                userInfo: {},
                pageList: [],
                AritcleType: [],
                showAside: false
            }
        },
        components: {
            NavMenu
        },
        async created() {
            this.config = await this.$api.getConfig();
            this.userInfo = await this.$api.getUser();

            const pageArr = await this.$api.getFirstPageList();

            pageArr.forEach(async (item, index) => {
                pageArr[index].children = [];
                pageArr[index].active = false;
                pageArr[index].children = await this.$api.getSecondPageList(item.id);
            })

            this.pageList = pageArr;

            const typeList = await this.$api.getAritcleTypeList();
            this.AritcleType = [{
                title: '分类',
                active: false,
                children: typeList
            }]
        },
    }
</script>

<style lang="scss">
    .header {
        width: 1300px;
        height: 50px;
        background: #F9F9F9;
        box-shadow: 0 1px 4px 1px rgba(0, 0, 0, .05);
        position: fixed;
        overflow: hidden;
        top: 0;
        z-index: 999;

        .show-aside {
            display: none;
        }

        .logo {
            float: left;
            width: 220px;
            height: 50px;
            display: flex;
            justify-content: center;

            img {
                width: 130px;
                height: 40px;
            }
        }
    }

    .container {
        margin-top: 50px;

        .aside {
            width: 220px;
            position: fixed;
            height: calc(100% - 50px);
            background: #F9F9F9;
            box-shadow: -1px 0px 4px 1px rgba(0, 0, 0, .05);
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            .border {
                border-bottom: 1px solid #fff;
            }

            .aside-user {
                width: 100%;
                height: 190px;
                text-align: center;
                padding: 20px 0 0;
                box-sizing: border-box;
                cursor: pointer;

                &:hover {
                    background: url(https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/snow.gif);
                    background-size: cover;

                    .user-name {
                        color: #999;
                    }
                }

                .user-portrait {
                    width: 96px;
                    height: 96px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto 10px;
                    box-shadow: 2px 2px 3px #e1e1e1;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-name {
                    font-weight: 700;
                    color: #777;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .user-info {
                    color: #98a6ad;
                    font-size: 12px;
                }
            }

            .aside-nav {
                padding-bottom: 50px;
            }

            .aside-footer {
                position: fixed;
                bottom: 0;
                width: 220px;
                height: 50px;
                background-color: #fff;
                text-align: center;
                color: #777;
                cursor: pointer;

                .icon {
                    margin: 6px 0;
                }

                .btn {
                    font-size: 14px;
                }
            }
        }

        .content {
            width: calc(100% - 220px);
            float: right;
            height: 3000px;
        }
    }

    @media screen and (min-width:1800px) {
        .wrapper {
            width: 1300px;
            margin: 0 auto;


        }
    }

    @media screen and (max-width:1800px) and (min-width:1200px) {
        .wrapper {
            width: 1170px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width:1200px) and (min-width:992px) {
        .wrapper {
            width: 970px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width:992px) and (min-width:768px) {
        .wrapper {
            width: 970px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width:992px) and (min-width:768px) {
        .wrapper {
            width: 750px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width:768px) {
        .wrapper {
            width: 100%;

            .header {
                width: 100%;

                .logo {
                    width: 100%;
                }

                .show-aside {
                    display: block;
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 26px;
                }
            }

            .aside {
                transition: left .5s;
                left: -100%;

                &.aside-active{
                    left: 0;
                }
            }

            .content {
                float: left;
                width: 100%;
            }
        }
    }
</style>