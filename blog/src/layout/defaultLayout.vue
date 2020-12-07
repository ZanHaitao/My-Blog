<template>
    <div class="wrapper">
        <header class="header">
            <div class="logo">
                <img :src="config.logo" alt="">
            </div>
            <div class="search">
                <input placeholder="请输入关键词搜索" class="search-input" type="text">
                <button class="search-btn el-icon-search"></button>
            </div>
            <div class="music">
                <div class="music-img" :class="{ 'play': musicState}">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1892204807,2455024704&fm=26&gp=0.jpg" alt="">
                </div>
                <div class="music-tab">
                    <p class="music-text">
                        <span v-if="musicState">正在播放: </span>
                        <span>Try-P!nk</span>
                    </p>
                    <p class="music-function">
                        <span @click="changeMusic" class="last-btn el-icon-d-arrow-left"></span>
                        <span @click="changeMusicState" v-if="musicState" class="pause-btn el-icon-video-pause"></span>
                        <span @click="changeMusicState" v-else class="play-btn el-icon-video-play"></span>
                        <span @click="changeMusic" class="next-btn el-icon-d-arrow-right"></span>
                    </p>
                </div>

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
            <div class="content" :class="{'content-hide':showAside}" @click="changeAside">
                <div class="left-content">
                    <router-view />
                    <div class="content-footer">
                        <span>{{ config.service }}</span>
                        <span>{{ config.record }}</span>
                    </div>
                </div>
                <div class="right-content">
                    <div class="content-tab">
                        <content-tab />
                    </div>
                    <div class="blog-info">
                        <blog-info />
                    </div>
                    <div class="label-content">
                        <label-content />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu';
    import ContentTab from '../components/ContentTab';
    import BlogInfo from '../components/BlogInfo';
    import LabelContent from '../components/LabelContent';
    export default {
        data() {
            return {
                config: {},
                userInfo: {},
                pageList: [],
                AritcleType: [],
                showAside: false,
                musicState: false,
                audio: '',
            }
        },
        components: {
            NavMenu,
            ContentTab,
            BlogInfo,
            LabelContent,
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
        mounted() {
            this.audio = new Audio();
            this.audio.src = "http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_3189432&response=res&type=convert_url&";
            this.audio.load();
            this.audio.addEventListener("ended", () => {
                this.audio.load();
                this.audio.play();
            });
        },
        methods: {
            changeMusicState() {
                this.musicState = !this.musicState;
                if (!this.musicState) {
                    this.audio.pause();
                } else {
                    this.audio.play();
                }
            },
            changeMusic() {
                this.audio.load();
                this.musicState = true,
                    this.audio.play();
            },
            changeAside(){
                if(this.showAside){
                    this.showAside = false;
                }
            }
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

        .search {
            float: left;
            height: 50px;
            line-height: 50px;

            .search-input {
                width: 150px;
                box-sizing: border-box;
                height: 32px;
                border: none;
                border-top-left-radius: 16px;
                border-bottom-left-radius: 16px;
                padding: 5px 10px 5px 15px;
                outline: none;
                font-size: 12px;
                border: solid 2px #fff;
                transition: border .5s;
                color: #777;

                &:hover {
                    background: #E0E6ED;
                }

                &:focus {
                    border: solid 2px #C6D8F5;
                    background: #fff;
                }
            }

            .search-btn {
                height: 32px;
                width: 36px;
                background-color: #fff;
                border: none;
                outline: none;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                text-align: left;
                vertical-align: middle;
                border-top-right-radius: 16px;
                border-bottom-right-radius: 16px;
            }
        }

        .music {
            height: 50px;
            float: right;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 50px;

            .music-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                border: 2px solid #fff;
                margin-right: 10px;

                img {
                    width: 100%;
                    height: 100%;
                }

                &.play {
                    animation: play 2s linear infinite;
                }

                @keyframes play {
                    0% {
                        transform: rotateZ(0deg);
                    }

                    100% {
                        transform: rotateZ(360deg);
                    }
                }
            }

            .music-function {
                margin-left: 10px;
                width: 120px;
                display: flex;
                justify-content: space-around;
                font-size: 14px;

                span {
                    cursor: pointer;
                }
            }

            .music-text {
                font-size: 12px;
                color: #777;
                margin-bottom: 7px;
                text-align: center;
            }
        }
    }

    .container {
        margin-top: 50px;
        box-shadow: 0 0px 4px 1px rgba(0, 0, 0, .05);
        overflow: hidden;

        .aside {
            width: 220px;
            position: fixed;
            height: calc(100% - 50px);
            background: #F9F9F9;
            overflow-y: scroll;
            z-index: 998;

            &::-webkit-scrollbar {
                display: none;
            }

            .border {
                border-bottom: 1px solid #fff;
            }

            .aside-user {
                width: 100%;
                height: 210px;
                text-align: center;
                padding: 30px 0 0;
                box-sizing: border-box;
                cursor: pointer;

                &:hover {
                    background: url(https://cdn.jsdelivr.net/gh/ihewro/blog@master/usr/themes/handsome/assets/img/snow.gif);
                    background-size: cover;

                    .user-name {
                        color: #999;
                    }

                    .user-portrait{
                        transform: rotateZ(360deg);
                    }
                }

                .user-portrait {
                    width: 96px;
                    height: 96px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto 10px;
                    box-shadow: 2px 2px 3px #e1e1e1;
                    transition: transform 1s;
                    border: 2px solid #fff;

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
                box-shadow: 0 -1px 1px rgba(0, 0, 0, .05), 0 0 0 rgba(0, 0, 0, .05);

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
            overflow: hidden;
            position: relative;

            .left-content {
                width: 840px;
                min-height: 1200px;
                position: relative;
                padding-bottom: 50px;
                background: #F1F3F4;

                .content-footer {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #777;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                }
            }

            .right-content {
                position: absolute;
                background-color: #F9F9F9;
                width: calc(100% - 840px);
                top: 0;
                bottom: 0;
                right: 0;
                overflow: hidden;
            }
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

            .header {
                width: 1170px;
            }

            .container>.content {
                .left-content {
                    width: 710px;
                }

                .right-content {
                    width: calc(100% - 710px);
                }
            }
        }
    }

    @media screen and (max-width:1200px) and (min-width:992px) {
        .wrapper {
            width: 970px;
            margin: 0 auto;

            .header {
                width: 970px;
            }

            .container>.content {
                .left-content {
                    width: 510px;
                }

                .right-content {
                    width: calc(100% - 510px);
                }
            }
        }
    }

    @media screen and (max-width:992px) and (min-width:768px) {
        .wrapper {
            width: 750px;
            margin: 0 auto;

            .header {
                width: 750px;
            }

            .container>.content {
                .left-content {
                    width: 100%;
                    min-height: 500px;
                }

                .right-content {
                    display: none;
                }
            }
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

                .search{
                    display: none;
                }

                .music{
                    display: none;
                }
            }

            .aside {
                transition: left .5s;
                left: -100%;

                &.aside-active {
                    left: 0;
                }
            }

            .content {
                float: left;
                width: 100%;
                position: relative;
                transition: margin .5s;
                &.content-hide{
                    margin-left: 220px;
                    &::after{
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, .5);
                        z-index: 99;
                    }
                }

                .left-content {
                    width: 100%;
                    min-height: 500px;
                }

                .right-content {
                    display: none;
                }

            }
        }
    }
</style>