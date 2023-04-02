<template>
  <el-card>
    <el-row :gutter="25">
                <el-col :span="10">
                    <!-- 搜索区域 -->
                    <el-input placeholder="请输入搜索内容"  v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-zoom-in" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" >添加用户</el-button>
                </el-col>
            </el-row>

    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column fixed prop="uid" label="uid" width="50">
      </el-table-column>
      <el-table-column prop="uname" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="uaccount" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="upassword" label="密码" width="120">
      </el-table-column>
      <el-table-column prop="uidcard" label="身份证" width="200">
      </el-table-column>
      <el-table-column prop="uphoneNumber" label="电话号码" width="120">
      </el-table-column>
      <el-table-column prop="uaddress" label="地址" width="120">
      </el-table-column>
      <el-table-column prop="usex" label="性别" width="120">
      </el-table-column>

      <el-table-column prop="uage" label="年龄" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="userEdit(scope.row)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="userDlete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 size-change 每页最大数变化 current-change 页数变化 layout 功能组件-->
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 100]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </el-card>
</template>
  
<script>
import axios from 'axios';
// import { response } from 'express';

export default {
  created() {
    this.getUserList();
    
  },
  methods: {
    userDlete(object) {
      let _this = this

      this.$confirm('是否确定要删除' + object.uname + '？', '删除数据', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        axios.delete('http://localhost:8081/user/deleteUser/' + object.uid).then(function (response) {
          if (response.data) {
            _this.$alert(object.uname + '删除成功！', '删除数据', {
              confirmButtonText: '确定',
              callback: action => {
                //跳转到/table
                location.reload()
              }
            });
          }
        })

      }).catch(() => {

      });

    },
    userEdit(object) {
      this.$router.push('/useredit?id=' + object.uid)
    },
     //获取所有用户
     getUserList() {
     var _this = this
    axios.get('http://localhost:8081/user/findAll').then(function (reponse) {
      _this.tableData = reponse.data
    })
        },
    
  },
  
  data() {
    return {
      //查询分页实体
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,//总记录数
      tableData: null
    }
  }
}
</script>
<style lang="less" scoped>
/* 卡片区域  !important 提高样式级别 */
.el-card {
  box-shadow: 0 1px 1px rgba(0, 8, 10, 0.15) !important;
}
</style>
