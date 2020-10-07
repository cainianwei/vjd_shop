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
                <el-button type="primary" @click="setDialogHandel">添加设置</el-button>
            </el-col>
        </el-row>

        <tree-grid :data="dataList" :columns="columns" border :selection-type="false" :expand-type="false" show-index index-text="ID" class="tabel-rows">
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

    <!-- 添加设置 -->
    <el-dialog title="添加设置" :visible.sync="setDialogVisible" width="30%" >
    <el-form :model="setFormData" :rules="setFormDataRule" ref="ruleForm" label-width="100px">
        <el-form-item label="活动名称" prop="title">
            <el-input v-model="setFormData.title"></el-input>
        </el-form-item>

        <el-form-item label="父级分类" prop="title">
            <el-cascader v-model="selectedKeys" :options="parentCateList" :props="cascaderProps" @change="parentCateChanged" clearable></el-cascader>
        </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setDialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
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
            setDialogVisible: false,
            setFormData: {
                title: '',
                pid: 0,

            },
            setFormDataRule: {
                title: [
                    { required: true, message: '请输入设置名称', trigger: 'blur' }
                ]
            },
            parentCateList: [],
            cascaderProps: {
                value: 'id',
                label: 'title',
                children: 'children',
                expandTrigger: 'hover',
                checkStrictly: true
            },
            selectedKeys: [],
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
            
        },
        setDialogHandel(){
            this.getParentList()
            this.setDialogVisible = true;
        },
        async getParentList(){
            const {data:res} = await this.axios.post('/v1/getRoleArr')
            if(res.errorCode !== 10000) return this.$message.error('获取失败')
            this.parentCateList = res.rows

        },
        parentCateChanged(){
           console.log(this.selectedKeys) 
           
        },
    }
}
</script>

<style lang="less" scoped>
.tabel-rows {margin-top: 15px;}
.el-cascader {width: 100%;}
</style>