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
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="setCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" >
                    <el-submenu :index="items.id+''" v-for="items in menuList" :key="items.id">
                        <template slot="title"><i :class="iconsObj[items.id]"></i>{{items.title}}</template>
                        <!-- <el-menu-item-group  v-for="chilItems in items.child" :key="chilItems.id">
                        <el-menu-item :index="chilItems.id+''">{{chilItems.title}}</el-menu-item>
                        </el-menu-item-group> -->
                        <el-menu-item :index="chilItems.id+''" v-for="chilItems in items.child" :key="chilItems.id" >
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{chilItems.title}}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-aside>
            
            <el-container>
                <!-- 内容区 -->
                <el-main>Main</el-main>
                <!-- 底部导航 -->
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
  
</template>

<script>
export default {
    data(){
        return {
            menuList: [],
            iconsObj: {
                '68': 'iconfont icon-users',
                '253': 'iconfont icon-user-check',
                '280': 'iconfont icon-home3',
                '285': 'iconfont icon-stats-bars2',
            },
            isCollapse: false,
            setTransition: false,
        }
    },
    created(){//权限拦截需要在页面刷新之前进行，所以这里不能用mounted
        this.getMenuList()

    },
    methods: {
        loginOut(){
            window.localStorage.removeItem('token')
            this.$router.push('/login')
        },
        getMenuList(){
            this.axios.post('/v1/getRole').then((res)=>{
                if(res.data.errorCode!==10000) return this.$message.error(res.data.msg)
                this.menuList=res.data.rows
            })
        },
        setCollapse(){
            this.isCollapse = !this.isCollapse;
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
    border: none;
}

.el-button {
    float: right;
    margin: 10px 10px 0px;
    
}

.iconfont {
  margin-right: 5px;
}

.toggle-button {
    background: #333744;
    color: #fff;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: 0.2em; /*设置文字的间距*/
    
}

</style>