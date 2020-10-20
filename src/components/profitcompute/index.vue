<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计</el-breadcrumb-item>
            <el-breadcrumb-item>分润统计</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.id" class="input-with-select" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <el-table :data="orderData" style="width: 100%" border stripe>
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_price"
                    label="商品价格">
                </el-table-column>
                <el-table-column
                    prop="goods_storage"
                    label="商品库存">
                </el-table-column>
                <el-table-column
                    prop="goods_type"
                    label="商品类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.goods_type===1" type="success">商城</el-tag>
                        <el-tag v-else type="danger">其他</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goods_price"
                    label="商品价格">
                </el-table-column>
                <el-table-column
                    prop="createtime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" icon="el-icon-edit" @click="handelEdit(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-location" @click="handelTimeLine(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="nowPage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="queryInfo.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-dialog title="编辑" :visible.sync="dialogVisible" width="60%" @close="handleClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item label="省市/区" prop="address">
                    <el-cascader :options="cityData" v-model="editForm.address"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2" >
                    <el-input v-model="editForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleToEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
import cityData from './citydata.js'

export default {
    data(){
        return {
            queryInfo: {
                id: '',
                skip: 0,
                limit: 2,
                token: '35d886b9439876ba0824f32b67976413'
            },
            orderData: [],
            type: 1,
            nowPage: 1,
            total: 0,
            dialogVisible: false,
            editForm: {
                address: [],
                address2: ''
            },
            editFormRules: {
                address: [
                    { required: true, message: '请选择省市区县', trigger: 'blur' }
                ],
                address2: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ]
            },
            cityData,
            reverse: true,
            activities: [{
                content: '活动按期开始',
                timestamp: '2018-04-15'
                }, {
                content: '通过审核',
                timestamp: '2018-04-13'
                }, {
                content: '创建成功',
                timestamp: '2018-04-11'
            }],
            progressVisible: false
        }
    },
    created(){
        this.getList()
    },
    methods: {
        async getList(){
            const {data:res} = await this.axios.post('/v1/goodsList/'+`${this.type}/`+`${this.queryInfo.skip}/`+`${this.queryInfo.limit}`,this.queryInfo)
            if(res.errCode!==1000) return this.$message.error('获取失败')
            this.orderData = res.rows
            this.total = res.total
            
        },
        searchGoods(){
            this.getList()
            
        },
        handleSizeChange(nowSize){
            this.queryInfo.limit = nowSize;
            this.getList()
        },
        handleCurrentChange(goPage){
            this.queryInfo.skip = (goPage-1)*this.queryInfo.limit;
            this.getList()

        },
        handelEdit(editFrom){
            this.editForm = editFrom
            this.dialogVisible =true
        },
        handleClose(){
            this.$refs.editFormRef.resetFields()
        },
        async handleToEdit(){
            const {data:res} = await this.axios.post('/v1/')
            if(res.errCode!==10000) return this.$message.error('获取失败')
            this.$message.success('更新成功')
            this.dialogVisible = flase
            this.getList()

        },
        handelTimeLine(editFrom){
            console.log(editFrom)
            this.progressVisible = true
        }

    }
}
</script>

<style lang="less" scoped>
.el-cascader {
    width: 100%;
}
</style>