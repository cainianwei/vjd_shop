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
                <span>选择分类</span>
                    <el-cascader v-model="selectedKeys" :options="menuList" :props="menuProps" @change="handleChange"></el-cascader>
            </el-col>
        </el-row>

        <!-- tab 页签区域 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="first">
                <!-- 添加参数的按钮 -->
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" >添加参数</el-button>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="second">
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" >添加属性</el-button>
            </el-tab-pane>
        </el-tabs>
    </el-card>
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
            
        },
        handleClick(){

        },
        
    },
    computed: {
        isBtnDisabled(){
            if(this.selectedKeys.length !==3) return true
            return false
        }
    }
}
</script>

<style>

</style>