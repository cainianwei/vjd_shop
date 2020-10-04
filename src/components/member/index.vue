<template>
    <div>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">会员管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>

        <el-card class="box-card">
            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                >
                </el-table-column>
                <el-table-column
                prop="title"
                label="栏目名"
                >
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="创建日期"
                >
                </el-table-column>
                <el-table-column
                prop="sort"
                label="等级">
                <template slot-scope=" scope ">
                    <el-tag v-if=" scope.row.sort===1 ">等级一</el-tag>
                    <el-tag type="success" v-else-if=" scope.row.sort===2 ">等级二</el-tag>
                    <el-tag type="warning" v-else>等级三</el-tag>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
        }
    },
    created(){
        this.getMemberList()
    },
    methods: {
        async getMemberList(){
            const { data: res } = await this.axios.get('/v1/adminRole/'+'0'+'/'+'2')
            if(res.errorCode!==10000) return this.$message.error('获取失败')

            this.tableData = res.rows
            this.$message.success('获取成功')
        }
    }
}
</script>

<style>

</style>