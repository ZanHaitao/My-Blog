<template>
    <div class="admin-login">
        <div class="tip" :class="{'show':tip}">{{message}}</div>
        <div class="login-panel">
            <p class="login-logo">
                <img src="https://cdn.jsdelivr.net/gh/ihewro/blog_now@master/logo.svg" alt="">
            </p>
            <p class="login-input">
                <input v-model="loginId" placeholder="用户名" type="text">
            </p>
            <p class="login-input">
                <input v-model="loginPwd" placeholder="密码" type="password" @keydown.enter="handleLogin">
            </p>
            <p class="login-btn">
                <button @click="handleLogin">登录</button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginId: '',
                loginPwd: '',
                tip: false,
                message: ""
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id !== undefined) {
                    this.$router.push({ name: 'adminIndex' });
                }
            }, 1000)
        },
        methods: {
            async handleLogin() {
                if (this.loginId != "" && this.loginPwd != "") {
                    const result = await this.$api.userLogin(this.loginId, this.loginPwd);

                    if (result) {
                        this.$store.dispatch('changeLoginUser', result)
                        this.$router.push({ name: 'adminIndex' });
                    } else {
                        this.tip = true;
                        this.message = "输入用户名或密码错误！"
                        setTimeout(() => {
                            this.tip = false;
                            this.message = "";
                        }, 3000)
                    }
                } else {
                    this.tip = true;
                    this.message = "输入用户名或密码不能为空！"
                    setTimeout(() => {
                        this.tip = false;
                        this.message = "";
                    }, 3000)
                }
            }
        },
    }
</script>

<style lang="scss">
    .admin-login {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #EFEFEF;

        .tip {
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #8a6d38;
            background: #FFF6BF;
            opacity: 0;
            transition: opacity .5s;

            &.show {
                opacity: 1;
            }
        }

        .login-panel {
            border-radius: 5px;
            box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
            width: 500px;
            height: 370px;
            padding: 20px;
            box-sizing: border-box;
            background: #fff;
            position: absolute;
            top: calc(50% - 175px);
            left: calc(50% - 225px);

            .login-logo {
                width: 300px;
                margin: 20px auto 40px;

                img {
                    width: 100%;
                }
            }

            .login-input {
                margin: 20px 0;
                padding: 0 40px;

                input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 10px;
                    height: 40px;
                }
            }

            .login-btn {
                padding: 0 40px;

                button {
                    width: 100%;
                    height: 40px;
                    outline: none;
                    font-weight: bold;
                    color: #fff;
                    border: none;
                    background-color: #000;
                    cursor: pointer;

                    &:hover {
                        background: rgba(0, 0, 0, 0.719);
                    }
                }
            }
        }
    }
</style>