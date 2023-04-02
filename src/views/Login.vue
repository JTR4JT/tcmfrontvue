<template>
    <div id = "logindiv" >
        <el-form ref="form" :model="form" label-width="0px">
            <h3>登录</h3>
                <el-form-item label="">
                    <el-input type="text" v-model="form.uaccount" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input type="password" v-model="form.upassword"  placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="background-color: #505458;">登录</el-button>
                    <el-button type="primary" @click="toRegister" style="background-color: #505458;">注册</el-button>
                </el-form-item>
        </el-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          upassword: '',
          uaccount: '',
          
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post('http://localhost:8081/user/',this.form).then((res)=>{
            let data = res.data;
            if(data.success){
                 this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
        });
        this.$router.push("/usermsg")
            }
        })
       
      },
      toRegister()
      {
        this.$router.push("/register")
      }
    }
  }
  </script>
  <style>
    #logindiv{
        width: 500px;
        height: 300px;
        text-align: center;
    }

</style>