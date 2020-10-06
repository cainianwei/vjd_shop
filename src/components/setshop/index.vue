<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商城设置</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary">添加设置</el-button>
            </el-col>
        </el-row>

        <tree-grid :data="dataList" :columns="columns" border :selection-type="false" :expand-type="false" show-index index-text="ID">
            <!-- 是否有效 -->
            <template slot="isok" slot-scope=" scope ">
                <i class="el-icon-success" v-if="scope.row.pid === 0" style="color: lightgreen;"></i>
                <i class="el-icon-error" v-else style="color: red;"></i>
            </template>
            <!-- 等级 -->
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.id<=10">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.id>10 && scope.row.id<100">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
            </template>
            <!-- 操作 -->
            <template slot="opt" slot-scope="">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
        </tree-grid>

    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            dataList: [],
            columns: [        
                {
                    label: '分类名称',
                    prop: 'title'
                },
                {
                    label: '是否有效',
                    type: 'template',
                    template: 'isok'
                },
                {
                    label: '排序',
                    // 表示，将当前列定义为模板列
                    type: 'template',
                    // 表示当前这一列使用模板名称
                    template: 'order'
                },
                {
                    label: '操作',
                    // 表示，将当前列定义为模板列
                    type: 'template',
                    // 表示当前这一列使用模板名称
                    template: 'opt'
                }
            ],
            total: 100,
        }
    },
    created(){
        this.getDataList()
    },
    methods: {
        async getDataList(){
            const {data: res} =await this.axios.post('/v1/getRoleArr')

            if(res.errorCode !== 10000 ) return this.$message.error('获取失败')

            this.$message.success('获取成功')
            this.dataList = res.rows
            console.log(this.dataList)
        }
    }
}
</script>

<style>

</style>