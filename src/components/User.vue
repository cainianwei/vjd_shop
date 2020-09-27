<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>层级关系</el-breadcrumb-item>
  </el-breadcrumb>

<!-- 卡片 -->
  <el-card class="box-card">
    <el-row :gutter="20"> <!--gutter 设置间距-->
      <el-col :span="7">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">
          添加用户
        </el-button>
      </el-col>
    </el-row>
    
    <!-- 表格 -->
    <el-table
      :data="dataList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        >
      </el-table-column>
      <el-table-column
        label="比例">
      </el-table-column>
      <el-table-column label="状态">
         <template slot-scope=" scope ">    <!-- 通过插槽作用域获取子组件的数据，主组件饮用子组件并能够将标签插入子组件说明子组件具有插槽功能-->
          <el-switch v-model="scope.row.percent" >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>

          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
          
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      queryInfo: {
        token: '3a2b081b3ac055717dc97f24e7331069',
        limit: 2,
        skip: 0
      },
      dataList: [],
      currentPage: 1,
      total: 0
    }
  },
  created(){
    this.getUserList()
  },
  methods: {
    async getUserList(){
      const { data: res }= await this.axios.post('/v1/userTrade',this.queryInfo)
      if(res.errorCode!==1000) return this.$message.error('获取失败')
      console.log(this.queryInfo);
      this.dataList=res.rows
      this.total=res.count
    },
    handleSizeChange(nowSize){
      this.queryInfo.limit=nowSize;
      this.getUserList()
    },
    handleCurrentChange(nowChange){
      this.queryInfo.currentPage=nowChange
      this.queryInfo.skip=(nowChange-1)*this.queryInfo.limit
      this.getUserList()
    },
  }
}
</script>

<style lang="less" scoped>

.box-card {
  width: 100%;
  box-shadow: 0 1px 1px #ccc !important;
}

</style>