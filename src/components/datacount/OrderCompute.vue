<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计</el-breadcrumb-item>
            <el-breadcrumb-item>订单统计</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 查询框 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div>
                        <el-input placeholder="请输入内容" v-model="queryMsg.classify_id" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="handelToSearch"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addCompute">添加商品</el-button>
                </el-col>    
            </el-row>
            <!-- 表格 -->
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="ID" >
                    </el-table-column>
                    <el-table-column prop="classify_id" label="分类ID" >
                    </el-table-column>
                    <el-table-column prop="title" label="标题" >
                    </el-table-column>
                    <el-table-column prop="city" label="城市" >
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="">
                            <el-button type="primary" class="el-icon-edit" size="mini"></el-button>
                            <el-button type="danger" class="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryMsg.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            queryMsg: {
                classify_id: '',
                limit: 10,
                skip: 0
            },
            total: 0,
            currentPage: 1
        }
    },
    created(){
        this.getDataList()
    },
    methods: {
        async getDataList(){
            const {data: res} = await this.axios.post('/v1/carlist',this.queryMsg)
            if(res.errcode !== 10000) return this.$message.error('获取失败')
            this.tableData = res.rows
            this.total = res.total;

        },
        handelToSearch(){
            this.getDataList();
        },
        handleSizeChange(nowSize){
            this.queryMsg.limit = nowSize
            this.getDataList()
        },
        handleCurrentChange(nowPage){
            this.queryMsg.skip = (nowPage-1)*this.queryMsg.limit
            this.getDataList()
        },
        addCompute(){
            this.$router.push('/addCompute')
        }
    },
    
}
</script>

<style>

</style>