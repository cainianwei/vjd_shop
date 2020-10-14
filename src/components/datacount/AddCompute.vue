<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计</el-breadcrumb-item>
            <el-breadcrumb-item>新增统计</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
            <el-steps :space="200" :active="autocheck" finish-status="success" align-center>
                <el-step class="elstep" title="基本信息"></el-step>
                <el-step class="elstep" title="商品参数"></el-step>
                <el-step class="elstep" title="商品属性"></el-step>
                <el-step class="elstep" title="商品图片"></el-step>
                <el-step class="elstep" title="商品内容"></el-step>
                <el-step class="elstep" title="完成"></el-step>
            </el-steps>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            autocheck: 0,
        }
    }
}
</script>

<style lang="less" scoped>
.el-steps {
    margin-top: 20px;
}

</style>