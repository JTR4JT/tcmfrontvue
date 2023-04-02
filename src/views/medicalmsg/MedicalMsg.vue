<template>
    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        fixed
        prop="mid"
        label="mid"
        width="50">
      </el-table-column>
      <el-table-column
        prop="mimage"
        label="图片"
        width="120">
        <template slot-scope="scope">
                <img :src="scope.row.mimage" style="height: 70px"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="mname"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="mtype"
        label="种类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="mwork"
        label="功效"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mprice"
        label="价格(元/g)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="minventory"
        label="库存"
        width="120">
      </el-table-column>
      <el-table-column
        prop="mintroduction"
        label="介绍"
        width="120">
      </el-table-column>
      <el-table-column
       
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="medicalDlete(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="medicalEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
import axios from 'axios';
// import { response } from 'express';

    export default {
      methods: {
        medicalDlete(object) {
        let _this = this

        this.$confirm('是否确定要删除'+object.mname+'？', '删除数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {

            axios.delete('http://localhost:8081/cm/deleteMedical/'+object.mid).then(function (response) {
                if(response.data){
                    _this.$alert(object.mname+'删除成功！', '删除数据', {
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
        medicalEdit(object) {
          this.$router.push('/medicaledit?id='+object.mid)
        }
      },
      created()
      {
            var _this = this
            axios.get('http://localhost:8081/cm/findAllMedical').then(function(reponse){
                _this.tableData = reponse.data
            })
      },
      data() {
        return {
          tableData: null
        }
      }
    }
  </script>