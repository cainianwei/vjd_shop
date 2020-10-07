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
        <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getUserList">   <!--@clear element-ui 事件，清除搜索框执行什么操作-->
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">
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
        prop="mobile"
        label="手机号"
        >
      </el-table-column>
      <el-table-column
        prop="pinvite"
        label="邀请码">
      </el-table-column>
      <el-table-column label="状态">
         <template slot-scope=" scope ">    <!-- 通过插槽作用域获取子组件的数据，主组件饮用子组件并能够将标签插入子组件说明子组件具有插槽功能-->
          <el-switch v-model="scope.row.is_vip" @change="userStateChanged(scope.row)">
            
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope=" scope ">
              <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserShow(scope.row.token)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>

            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="openRoleDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
          
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </el-card>

  <!-- 新增添加用户对话框 -->
  <el-dialog title="新增用户" :visible.sync="dialogVisible" width="30%" @close="resetField">    <!--close  为element-ui内置函数-->
      <span>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
          <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click=" dialogVisible = false " >取 消</el-button>
          <el-button type="primary" @click=" addUser">确 定</el-button>
      </span>
  </el-dialog>

<!-- 编辑用户对话框 -->
  <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%" >
    <span>
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" >
        <el-form-item label="用户名" >
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </span>
  </el-dialog>

<!-- 分配角色对话框 -->
  <el-dialog title="分配权限" :visible.sync="roleDialogVisible" width="30%" @close="setRoleDialogClosed">
    <div>
      <p>用户手机号: {{users.mobile}}</p>
      <p>邀请码: {{users.invite}}</p>
      <el-select v-model="selectedRoleId" placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
    </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="roleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {  //test方法用于正则校验
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|16[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if(regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      queryInfo: {
        query: '',
        limit: 20,
        skip: 0
      },
      dataList: [],
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {

      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      roleDialogVisible: false,
      users: {},
      rolesList: [],
      selectedRoleId: ''
    }
  },
  created(){
    this.getUserList()
  },
  methods: {
    async getUserList(){
      const { data: res }= await this.axios.post('/v1/userlist',this.queryInfo)
      if(res.errorCode!==1000) return this.$message.error('获取失败')
      res.rows.forEach(element => {
        element.is_vip=Boolean(element.is_vip)
      });
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
    async userStateChanged(userInfo){
      const {data:res} = await this.axios.post('/v1/upTrade',{id:userInfo.id,percent:userInfo.percent})
      if(res.errorCode!==10000){ 
        userInfo.percent = Boolean(!userInfo.percent)
        return this.$message.error('状态修改失败')
      }
      return this.$message.success('状态修改成功')
    },
    resetField(){
      this.$refs.addFormRef.resetFields()  //from表单插件内置函数，重置表单内容为空
    },
    addUser(){
      this.$refs.addFormRef.validate( async valid => {
        if(!valid) return
        const {data: res} = await this.axios.post('/v1/register',this.addForm)
        if(res.errorCode!==1000) return this.$message.error('新增用户失败');
        this.$message.success('新增用户成功')
        this.dialogVisible = false;
        // 重新获取用户列表数据
        this.getUserList()
      });

    },
    async editUserShow(token){
      
      const {data:res} = await this.axios.post('/v1/userMsg',{token: token})
      if(res.errorCode !== 10000) return this.$message.error('查询用户信息失败')
      this.editForm=res.rows
      this.editDialogVisible = true
    },
    editUser(){
      this.$refs.editFormRef.validate(async valid => {
        if(!valid) return

        const {data: res} = await this.axios.post('/v1/upUserMsg/'+this.editForm.id,
        {email: this.editForm.email,mobile: this.editForm.mobile})

        if(res.errorCode!==10000){return this.$message.error('修改失败')}


        this.editDialogVisible = false

        this.getUserList()

        this.$message.success('修改')
      }); 
    },
     delUser(id){
        this.$messagebox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          
          const {data: res} = await this.axios.post('/v1/upUserMsg/'+id)
          console.log(res)
          if(res.errorCode!==10000) return this.$message.error('修改失败')

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    async openRoleDialog(users){
      this.users = users
      const {data: res} = await this.axios.get('/v1/adminRoles')
      if(res.errorCode!==10000) return this.$message.error('查询失败')
      this.rolesList = res.rows
      this.roleDialogVisible = true
    },
    async saveRoleInfo(){
      if(!this.selectedRoleId) return this.$message.error('请选择要分配的角色')
      
      const { data: res } = await this.axios.post(
        `/v1/getRoleArr`
      )

      if (res.errorCode !== 10000) {
        return this.$message.error('更新角色失败！')
      }

      this.$message.success('更新角色成功！')
      this.getUserList()
      this.roleDialogVisible = false
    },
    setRoleDialogClosed(){
      this.selectedRoleId = ''
      this.users = {}
    }
  },
}
</script>

<style lang="less" scoped>

.box-card {
  width: 100%;
  box-shadow: 0 1px 1px #ccc !important;
}

</style>