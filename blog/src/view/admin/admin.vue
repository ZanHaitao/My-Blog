<template>
    <div>
        <admin-nav />
        <router-view></router-view>
    </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
    export default {
        components:{
            AdminNav
        }
    }
</script>