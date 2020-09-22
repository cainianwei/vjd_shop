<template>
  <div class="login_center">
    <!-- 头像部分 -->
      <div class="login_box">
        <div class="login_logo_box">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 表单区 -->
        <div>
          <el-form ref="formRef" :model="formItems" :rules="loginRules" label-width="">
            <el-form-item prop="username">
              <el-input v-model="formItems.username" placeholder="请输入内容" class='username' prefix-icon="icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="formItems.password" show-password prefix-icon="icon-lock"></el-input>
            </el-form-item>  
              
            <el-form-item class="btns">
              <el-button type="primary" @click="toLogin">登录</el-button>
              <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
// import {Button} from 'element-ui'
export default {
  data(){
    return {
      formItems: {
        username: '',
        password:''
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: 'blur'},
          { min: 3, max: 15, message: "长度在3~15个字符", trigger: 'blur'}
        ],
        password: [
          { required: true, message: "请输入密码", trigger: 'blur'},
          { min: 3, max: 15, message: "长度在3~15个字符", trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    toLogin(){
      this.$refs.formRef.validate((valid)=>{
        if(!valid) return
        this.axios.post('/v1/login',{
          mobile:this.formItems.username,
          pass:this.formItems.password,
        }).then((res)=>{
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
          window.localStorage.setItem('token',res.data.token);//注意操作顺序，先存储token再跳转，否则路由守卫报错
          this.$router.push('/home')
        }).catch(()=>{
          this.$message.error('登录失败');
        })
      })
    },
    reset(){
      console.log(this.$refs.formRef.resetFields())
    }
  }
}
</script>

<style lang="less" scoped>
.login_center {background: #2b4b6b; height: 100%; position: relative;}
.login_box {width: 450px; height: 300px; background: #fff; position: absolute; margin: auto;  top: 0;left: 0;right: 0;bottom: 0; border-radius: 3px;}
.login_logo_box {
    width: 130px; 
    height: 130px; 
    border: 1px solid #eee; 
    border-radius: 50%; 
    overflow: hidden; 
    padding: 10px; 
    box-shadow: 0 0 10px #ddd; 
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  } 
.el-input {
  margin: 10px 0 0 0;
  width: 420px;

}
.username { margin-top: 80px; }
.btns {
  position: absolute;
  margin-top: 10px;
  right: 10px;
}

.el-form  {
  margin-left: 20px;
}
</style>

