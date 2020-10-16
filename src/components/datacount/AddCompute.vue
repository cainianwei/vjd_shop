<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计</el-breadcrumb-item>
            <el-breadcrumb-item>新增统计</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
            <el-steps :space="200" :active="autocheck - 0" finish-status="success" align-center>
                <el-step class="elstep" title="基本信息"></el-step>
                <el-step class="elstep" title="商品参数"></el-step>
                <el-step class="elstep" title="商品属性"></el-step>
                <el-step class="elstep" title="商品图片"></el-step>
                <el-step class="elstep" title="商品内容"></el-step>
                <el-step class="elstep" title="完成"></el-step>
            </el-steps>

            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top" >
                <el-tabs v-model="autocheck" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                              <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item >
                            <el-checkbox v-for="(item,i) in checkList" :key="i" v-model="checkList" :label="item" border></el-checkbox>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item v-for="item in attrList" :key="item.id" :label="item.name" >
                            <el-input v-model="item.description" ></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload class="upload-demo" :action="actionUrl" :on-preview="handlePreview" 
                        :on-remove="handleRemove" list-type="picture" name="img" :on-success="handelToSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>

        <!-- 缩略图 -->
        <el-dialog
        title="缩略图"
        :visible.sync="previewVisible"
        width="50%">
        <img :src="previewImg" alt="" class="upImg">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            autocheck: "0",
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                goods_cat: [],
                goods_pic: [],
            },
            addFormRules: {
                goods_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goods_price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                goods_weight: [
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                ],
                goods_number: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
                ],
                goods_cat: [
                    { required: true, message: '请输入商品分类', trigger: 'blur' },
                ]
            },
            cateList: [],
            cateProps: { 
                value: 'id',
                label: 'title',
                children: 'children',
                expandTrigger: 'hover',
                checkStrictly:true 
            },
            checkList: [],
            attrList: [],
            actionUrl: 'http://localhost:8080/v1/upimg',
            previewImg: '',
            previewVisible: false
        }
    },
    created(){
        this.getcateList()
    },
    methods: {
        handleChange(){
            if(this.addForm.goods_cat.length<3){
                this.addForm.goods_cat=[]
                return
            }
        },
        async getcateList(){
            const {data:res} =await this.axios.post('/v1/getRoleArr')
            if(res.errorCode !== 10000) return this.$message.error('获取失败')
            this.cateList = res.rows
        },
        beforeTabLeave(activeName,oldActiveName){
            if(oldActiveName==='0' && this.addForm.goods_cat.length<3) {
                this.$message.error('请先选择分类')
                return false
            }
        },
        async tabClicked(){
            if(this.autocheck==1){
                const {data:res} =await this.axios.get('/v1/adminRoles')
                if(res.errorCode !==10000) return this.$message.error('获取失败')
                this.checkList = res.rows[0].sot_msg.split(',')
                
            }else if(this.autocheck==2){
                const {data:res} =await this.axios.get('/v1/adminRoles')
                if(res.errorCode !==10000) return this.$message.error('获取失败')
                this.attrList = res.rows
                console.log(this.attrList)
            }
        },
        handlePreview(file){
            this.previewImg = 'http://wjym.didizy.com/'+file.response.rows.img_url
            console.log(this.previewImg)
            this.previewVisible = true

        },
        handleRemove(file){
             // 1. 获取将要删除的图片的临时路径
             const filePath = file.response.rows.img_url
             //查找匹配的数组位置
             const i = this.addForm.goods_pic.findIndex(x => x.img===filePath) //es6简写  相当于 function（x）{x.img===filePath}
             //删除数组里的元素
             this.addForm.goods_pic.splice(i,1)
             
             console.log(this.addForm)
        },
        handelToSuccess(response){
            const imgInfo = {img: response.rows.img_url}
            this.addForm.goods_pic.push(imgInfo)
            
        }

    },
    computed: {
        cateId(){
            if(this.addForm.goods_cat,length===3){
                return this.addForm.goods_cat[2]
            }
            return null
        }
    }
}
</script>

<style lang="less" scoped>
.el-steps {
    margin-top: 20px;
}

.el-tabs {
    margin-top: 15px;
}

.el-form-item {
    width: 400px;
}

.upImg {
    width: 100%;
}
</style>