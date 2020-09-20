<template>
  <div class="login_center">
    <!-- 头像部分 -->
      <div class="login_box">
        <div class="login_logo_box">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 表单区 -->
        <div>
          <el-input v-model="username" placeholder="请输入内容" class='username' prefix-icon="icon-user"></el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="icon-lock"></el-input>
          <div class="btns">
            <el-button type="primary">登录</el-button>
            <el-button type="info">重置</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import {Button} from 'element-ui'
export default {
  data(){
    return {
      username: '',
      password:''
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
  margin: 10px 0 0 20px;
  width: 420px;

}
.username { margin-top: 80px; }
.btns {
  position: absolute;
  margin-top: 10px;
  right: 10px;
}


</style>>
