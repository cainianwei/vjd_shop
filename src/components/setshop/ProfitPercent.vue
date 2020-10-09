<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城设置</el-breadcrumb-item>
        <el-breadcrumb-item>分润比例</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>

            <el-row>
                <el-col>
                    <span>选择分类:</span>
                        <el-cascader v-model="selectedKeys" :options="menuList" :props="menuProps" @change="handleChange"></el-cascader>
                </el-col>
            </el-row>

            <!-- tab 页签区域 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="first">
                    <!-- 添加参数的按钮 -->
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>

                    <el-table :data="firstTableData" border stripe style="width: 100%">
                        <el-table-column prop="name" label="名称" >
                        </el-table-column>
                        <el-table-column prop="default_module" label="简介" >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="">
                                <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="second">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>

                    <el-table :data="secondTableData" border stripe style="width: 100%">
                        <el-table-column prop="name" label="名称" >
                        </el-table-column>
                        <el-table-column prop="default_module" label="简介" >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="">
                                <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- 添加参数的对话框 -->
        <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menuList: [],
            menuProps: {
                label: 'title',
                value: 'id',
                children: 'children',
                expandTrigger: 'hover',
                checkStrictly: true
            },
            selectedKeys: [],
            activeName: 'first',
            firstTableData: [],
            secondTableData: [],
            addDialogVisible: false,
            addForm: {
                name: ''
            },
            addFormRules: {
                name: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' }
                ]
            },
        }
    },
    created(){
        this.getMenuList()
    },
    methods: {
        async getMenuList(){
            const {data: res} = await this.axios.post('/v1/getRoleArr')
            if(res.errorCode !== 10000) this.$message.error('获取失败')

            this.menuList = res.rows;
        },
        handleChange(){
            this.getMenudata()
        },
        handleClick(){
            this.getMenudata()
        },
        async getMenudata(){
            if (this.selectedKeys.length !== 3) {
                this.selectedKeys = []
                return
            }

            const {data: res} = await this.axios.get('/v1/adminRoles')
            if(res.errorCode !== 10000) return this.$message.error('获取失败')
            
            if(this.activeName === 'first'){
                this.firstTableData = res.rows
                
            } else {
                this.secondTableData = res.rows
            }
        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        addParams(){
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.axios.get('/v1/adminRoles')

                if (res.errorCode !== 10000) {
                    return this.$message.error('添加参数失败！')
                }

                this.$message.success('添加参数成功！')
                this.addDialogVisible = false
                this.getMenuList()
            })
        }
        
    },
    computed: {
        isBtnDisabled(){
            if(this.selectedKeys.length !==3) return true
            return false
        },
        cateId(){
            if(this.selectedKeys.length === 3){
                return this.selectedKeys[2]
            }
            return null 
        },
        titleText(){
            if(this.activeName === 'first') return '动态参数'
            return '静态属性'
        }
    }
}
</script>

<style>

</style>