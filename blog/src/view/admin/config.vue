<template>
    <div class="admin-config">
        <div class="tip" v-show="showMessage">{{ message }}</div>
        <div class="config-title">基本设置</div>
        <div class="config-content">
            <p class="caption">站点名称</p>
            <p>
                <input v-model="title" placeholder="站点名称" type="text">
            </p>
            <p class="detail">
                站点的名称将显示在网页的标题处.
            </p>
            <p class="caption">网站logo地址</p>
            <p>
                <input v-model="logo" placeholder="网站logo地址" type="text">
            </p>
            <p class="detail">
                网站logo地址将显示再网页logo处.
            </p>
            <p class="caption">站点服务</p>
            <p>
                <input v-model="service" placeholder="站点服务" type="text">
            </p>
            <p class="detail">
                站点服务将显示在网页的最底处.
            </p>
            <p class="caption">站点备案</p>
            <p>
                <input v-model="record" placeholder="站点备案" type="text">
            </p>
            <p class="detail">
                站点备案将显示在网页的最底处.
            </p>
            <p class="btn">
                <button @click="updateConfig">保存设置</button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                logo: '',
                service: '',
                record: '',
                message: '',
                showMessage: false
            }
        },
        async created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.id == undefined) {
                    this.$router.push({ name: 'login' });
                }
            }, 1000)

            const result = await this.$api.getConfig();
            this.title = result.title;
            this.logo = result.logo;
            this.service = result.service;
            this.record = result.record;
        },
        methods: {
            async updateConfig() {
                if (this.title != "" && this.logo != "" && this.service != "" && this.record != "") {
                    const result = await this.$api.updateConfig({
                        title: this.title,
                        logo: this.logo,
                        service: this.service,
                        record: this.record
                    })
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
            sendMessage(content) {
                this.showMessage = true;
                this.message = content;
                setTimeout(() => {
                    this.showMessage = false;
                    this.message = "";
                }, 3000)
            }
        },
    }
</script>

<style lang="scss">
    .admin-config {
        width: 800px;
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

        .config-title {
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 30px;
        }

        .config-content {
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
</style>