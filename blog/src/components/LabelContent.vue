<template>
    <div class="label">
        <div class="title">标签云</div>
        <ul>
            <router-link :to="{name:'filterArticleLabel',params:{id:item.id}}" tag="li" v-for="item in labelData" :key="item.id">{{ item.title }}</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelData: []
            }
        },
        async created() {
            this.labelData = await this.$api.getLabelList();
        },
    }
</script>

<style lang="scss">
    .label {
        padding-bottom: 30px;
        overflow: hidden;
        padding-top: 10px;

        .title {
            color: #777;
            padding: 20px 10px 15px;
        }

        ul {
            padding: 0 15px;

            li {
                cursor: pointer;
                float: left;
                background-color: #cfdadd;
                font-size: 12px;
                color: #fff;
                padding: 0 5px;
                border-radius: 8px;
                line-height: 1;
                vertical-align: middle;
                font-weight: 700;
                text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
                display: inline-block;
                min-width: 10px;
                padding: 3px 7px;
                margin: 5px 3px;
            }
        }
    }
</style>