<template>
  
    <el-container>
        <el-header>
            <div>
                <img align=absmiddle src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
                <el-button type="info" @click="loginOut">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" >
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        </el-menu-item-group>
                        
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
  
</template>

<script>
export default {
    methods: {
        loginOut(){
            window.localStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {height: 100%;}
.el-aside {background-color: #333744;}
.el-main{background-color: #eaedf1;}
.el-footer{background-color: #373d41;}
.el-header {
    padding: 0;
    background-color: #373d41;
    color: #fff;
    > div span {
        padding-left: 5px;
    }    
}

.el-menu {
    text-color: #fff;
}

.el-button {
    float: right;
    margin: 10px 10px 0px;
    
}

</style>