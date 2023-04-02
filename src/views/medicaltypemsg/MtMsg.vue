<template>
    <div>

        <!-- 用户列表主体 -->
        <!-- 卡片视图区 -->
        <el-card>
            <el-row :gutter="25">
                <el-col :span="10">
                    <!-- 搜索区域 -->
                    <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="geyTypeList">
                        <el-button slot="append" icon="el-icon-zoom-in" @click="geyTypeList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加药材类型</el-button>
                </el-col>
            </el-row>
            <el-table :data="mtList" border stripe>
                <el-table-column label="种类ID" prop="tId"></el-table-column>
                <el-table-column label="种类名" prop="tName"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row.tId)"></el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="deleteType(scope.row.tId)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 size-change 每页最大数变化 current-change 页数变化 layout 功能组件-->
            <div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 100]" :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 添加药材类型 -->
            <el-dialog title="添加药材类型" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
                    <!-- 药材类型名 -->
                    <el-form-item label="药材类型名称" prop="tname">
                        <el-input v-model="addForm.tname"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 内容底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addType">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改对话框 -->
            <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
                <!-- 内容主体区域 -->
                <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="160px">
                   
                    <el-form-item label="ID" prop="tid">
                        <el-input v-model="editForm.tid" readonly></el-input>
                    </el-form-item>
                 
                    <el-form-item label="类型名称" prop="tname">
                        <el-input v-model="editForm.tname"></el-input>
                    </el-form-item>
                    
                </el-form>
                <!-- 内容底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editTypeInfo">确 定</el-button>
                </span>
            </el-dialog>


        </el-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created() {
        this.geyTypeList();
    },
    data() {
        return {
            //查询学习实体
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 5,
            },
            mtList: [],//用户列表
            total: 0,//总记录数
            addDialogVisible: false,//对话框状态
            addForm: {
                tid: '',
                tname: ''
            },
            //修改用户信息
            editForm: {
                tid: '',
                tname: ''
            },
            editDialogVisible: false,
            // 增加验证规则
            addFormRules: {
                tname: [
                    { required: true, message: "请输入药材类型名称", trigger: "blur" }
                ],

            },
            //修改
            editFormRules: {
                tname: [
                    { required: true, message: "请输入药材类型名称", trigger: "blur" }
                ],
            },
        }
    },
    methods: {
        //获取所有用户
        async geyTypeList() {
            var _this = this
            axios.get('http://localhost:8081/type/getAllTypeList', { params: _this.queryInfo }).then(function (response) {
                // console.log(response)
                _this.mtList = response.data.data
                _this.total = response.data.numbers
                // console.log(response.data.data)
            })
        },
        // 监听pageSize改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.geyTypeList(); // 数据发生改变重新申请数据
        },
        // 监听pageNum改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
            this.geyTypeList(); // 数据发生改变重新申请数据
        },

        // 监听添加用户
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();// 重置表单项
        },

        addType() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return; console.log(this.addForm);
                // 发起请求
                const { data: res } = await axios.post("http://localhost:8081/type/addType", this.addForm);

                if (res != "success") {
                    typeinfo.state = !typeinfo.state;
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");
                //隐藏
                this.addDialogVisible = false;
                this.geyTypeList();
            })
        },
        //根据主键删除
        async deleteType(id) {
            const confirmResult = await this.$confirm('操作会永久删除药材类型信息,是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult != 'confirm') {
                return this.$message.info("已取消删除");
            }
            const { data: res } = await axios.delete("http://localhost:8081/type/deleteType?id=" + id);
            if (res != "success") {
                return this.$message.error("删除失败！！！");
            }
            this.$message.success("删除成功！！！");
            this.geyTypeList();
        },
        //显示对话框修改
        async showEditDialog(id) {
            const { data: res } = await axios.get("http://localhost:8081/type/getUpdate?id=" + id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        //关闭对话框
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        //确定修改
        editTypeInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return;
                //发起修改请求
                const { data: res } = await axios.put("http://localhost:8081/type/editType", this.editForm);
                if (res != "success") {
                    return this.$message.error("修改失败！！！");
                }
                this.$message.success("修改成功！！！");

                this.editDialogVisible = false;
                this.geyTypeList();
            })
        },
    },

}
</script>
<style lang="less" scoped>
/* 面包屑样式 */
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

/* 卡片区域  !important 提高样式级别 */
.el-card {
    box-shadow: 0 1px 1px rgba(0, 8, 10, 0.15) !important;
}
</style>