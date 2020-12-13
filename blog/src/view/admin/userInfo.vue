<template>
    <div class="admin-userInfo">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="info-title">个人设置</div>
        <div class="info-content">
            <div class="left-content">
                <p class="portrait">
                    <img :src="$store.state.loginUser.userPortrait" alt="">
                </p>
                <p class="user-name">{{$store.state.loginUser.userName}}</p>
                <p class="user-info">{{$store.state.loginUser.userInfo}}</p>
            </div>
            <div class="right-content">
                <p class="title">个人资料</p>
                <p class="caption">昵称</p>
                <p>
                    <input v-model="userName" placeholder="昵称" type="text">
                </p>
                <p class="detail">
                    用户昵称可以与用户名不同, 用于前台显示.
                </p>
                <p class="caption">个人头像地址</p>
                <p>
                    <input v-model="userPortrait" placeholder="个人头像地址" type="text">
                </p>
                <p class="detail">
                    个人头像地址，用于前台展示.
                </p>
                <p class="caption">GitHub地址</p>
                <p>
                    <input v-model="github" placeholder="GitHub地址" type="text">
                </p>
                <p class="detail">
                    用户GitHub仓库地址，用于前台展示.
                </p>
                <p class="caption">电子邮箱地址</p>
                <p>
                    <input v-model="email" placeholder="电子邮箱地址" type="text">
                </p>
                <p class="detail">
                    电子邮箱地址将作为此用户的主要联系方式.
                </p>
                <p class="caption">个人简介</p>
                <p>
                    <input v-model="userInfo" placeholder="个人简介" type="text">
                </p>
                <p class="detail">
                    个人简介，用于前台展示.
                </p>
                <p class="btn">
                    <button @click="updateInfo">保存设置</button>
                </p>

                <p class="title">密码修改</p>
                <p class="caption">用户密码</p>
                <p>
                    <input v-model="loginPwd" placeholder="用户密码" type="password">
                </p>
                <p class="detail">建议使用特殊字符与字母、数字的混编样式,以增加系统安全性.</p>
                <p class="caption">用户密码确认</p>
                <p>
                    <input v-model="reconfirm" placeholder="用户密码确认" type="password">
                </p>
                <p class="detail">请确认你的密码, 与上面输入的密码保持一致.</p>
                <p class="btn">
                    <button @click="updatePassword">更新密码</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: this.$store.state.loginUser.userName,
                userPortrait: this.$store.state.loginUser.userPortrait,
                github: this.$store.state.loginUser.github,
                email: this.$store.state.loginUser.email,
                userInfo: this.$store.state.loginUser.userInfo,
                message: '',
                showMessage: false,
                loginPwd: '',
                reconfirm: ''
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000)
        },
        methods: {
            async updateInfo() {
                if (this.userName != "" && this.userPortrait != "" && this.github != "" && this.email != "" && this.userInfo != "") {
                    const result = await this.$api.updateUser({
                        userName: this.userName,
                        userPortrait: this.userPortrait,
                        github: this.github,
                        email: this.email,
                        userInfo: this.userInfo
                    });
                    if (result) {
                        this.sendMessage("修改成功！");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        this.sendMessage("修改失败，请检查后重新修改！")
                    }
                } else {
                    this.sendMessage("输入信息不完整！")
                }
            },
            async updatePassword() {
                if (this.loginPwd != "" && this.reconfirm != "") {
                    if (this.loginPwd === this.reconfirm) {
                        const result = await this.$api.updateUser({
                            loginPwd: this.loginPwd
                        })
                        if (result) {
                            this.sendMessage("修改成功！");
                            setTimeout(() => {
                                this.$store.dispatch('changeLoginUser',{})
                                this.$router.push({ name: 'login' });
                            }, 3000);
                        } else {
                            this.sendMessage("修改失败，请检查后重新修改！")
                        }
                    } else {
                        this.sendMessage("两次输入密码不一致！")
                    }
                } else {
                    this.sendMessage("输入信息不完整！")
                }
            },
            sendMessage(content) {
                this.showMessage = true;
                this.message = content
                setTimeout(() => {
                    this.showMessage = false;
                    this.message = "";
                }, 3000)
            }
        },
    }
</script>

<style lang="scss">
    .admin-userInfo {
        width: 800px;
        margin: 100px auto 0;

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

        .info-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;
        }

        .info-content {
            display: flex;

            .left-content {
                margin-right: 80px;

                .portrait {
                    width: 220px;
                    height: 220px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-name {
                    font-weight: bold;
                }

                .user-info {
                    font-size: 14px;
                    color: #999;
                    margin: 20px 0;
                }
            }

            .right-content {
                flex: 1;

                .title {
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .caption {
                    margin: 10px 0;
                    font-size: 14px;
                    font-weight: bold;
                }

                input {
                    width: 100%;
                    height: 30px;
                    padding: 0 10px;
                    border: 1px solid #D9D9D6;
                }

                .detail {
                    font-size: 12px;
                    color: #999;
                    margin: 10px 0 20px;
                }

                .btn {
                    margin: 20px 0 60px;

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
    }
</style>