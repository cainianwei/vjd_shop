<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>会员等级列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column type="expand">
                <template slot-scope=" scope ">
                    <div v-if=" scope.row.menu_auth ">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for=" (item1, i1) in scope.row.menu_auth " :key=" item1.id ">
                            <el-col :span="5">
                                <el-tag closable @close="delRole(scope.row,item1.id)">{{item1.title}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.child" :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag closable type="success" @close="delRole(scope.row,item2.id)">{{item2.title}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag closable type="warning" v-for="item3 in item2.child" :key="item3.id" @close="delRole(scope.row,item3.id)" >{{item3.title}}</el-tag>
                                    </el-col>
                                </el-row>    
                            </el-col>
                        </el-row>
                    </div>
                    
                </template>
            </el-table-column>
            <el-table-column prop="id" label="id">
            </el-table-column>
            <el-table-column prop="name" label="角色名称">
            </el-table-column>
            <el-table-column prop="description" label="角色描述">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope=" scope ">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>

                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

    </el-card>

    <!-- 分配权限弹窗 -->
        <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
        <!-- 树形控件 -->
            <el-tree show-checkbox :data="rightslist" :props="defaultProps" node-key="id" :default-checked-keys="defKeys" default-expand-all></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            setRightDialogVisible: false,
            rightslist: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            defKeys: []
        }
    },
    created(){
        this.getRoleList();
    },
     methods: {
        async getRoleList(){
            const { data: res } = await this.axios.get('/v1/adminRoles')
            if(res.errorCode!==10000) return this.$message.error('获取失败');

            this.tableData = res.rows
            this.$message.success('获取成功');
        },
        async delRole(roleList,id){
            // 弹框提示用户是否要删除
            const confirmResult = await this.$messagebox.confirm(
                '此操作将永久删除该文件, 是否继续?',
                '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }
            ).catch(err => err)

            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除！')
            }

            const { data: res } = await this.axios.delete(
                `/v1/removeRole/${roleList.id}/${id}`
            )

            if (res.errorCode !== 10000) {
                return this.$message.error('删除权限失败！')
            }

            roleList.menu_auth = ''
        },
        async showSetRightDialog(roleList){
            const { data: res } = await this.axios.post('/v1/getRoleArr')

            if(res.errorCode!==10000) return this.$message.error('获取失败')
            this.rightslist = res.rows
            this.getLeafKeys(roleList, this.defKeys)
            console.log(this.defKeys)
            this.setRightDialogVisible = true
        },
        getLeafKeys(node, arr) {
            // 如果当前 node 节点不包含 children 属性，则是三级节点
            if (!node.children) {
                return arr.push(node.id)
            }

            node.children.forEach(item => this.getLeafKeys(item, arr))
        },
        setRightDialogClosed() {
            this.defKeys = []
        },
    }
}
</script>

<style lang="less" scoped>
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.el-tag {
  margin: 7px;
}



</style>