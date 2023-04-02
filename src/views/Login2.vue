<template>
    <div class="login-container">
        <el-form :model="ruleForm" :rules="rules"
                 status-icon
                 ref="ruleForm"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">健康管理平台登录</h3>
            <el-form-item prop="aaccount">
                <el-input type="text"
                          v-model="ruleForm.aaccount"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="apassword">
                <el-input type="password"
                          v-model="ruleForm.apassword"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Login2",
        data(){
            return{
                logining: false,
                ruleForm: {
                    aaccount: '2458638823',
                    apassword: '123456',
                    aid: '',
                    aname: '',
                },
                rules: {
                    aaccount: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    apassword: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleSubmit(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        this.logining = true
                        let _this = this
                       
    
                            axios.put('http://localhost:8081/admin/adminLogin', _this.ruleForm).then(function (resp) {
                                _this.logining = false
                                if(resp.data.code == -1){
                                    _this.$alert('用户名不存在', '提示', {
                                        confirmButtonText: '确定'
                                    })
                                }
                                if(resp.data.code == -2){
                                    _this.$alert('密码错误', '提示', {
                                        confirmButtonText: '确定'
                                    })
                                }
                                if(resp.data.code == 0){
                                    //跳转到SystemAdmin
                                    //展示当前登录用户信息
                                    console.log(resp.data);
                                    _this.$alert('登录成功', '提示', {
                                        confirmButtonText: '确定'
                                    })
                                    // window.sessionStorage.setItem("user",resp.data.data.aname);
                                    window.sessionStorage.setItem('admin', JSON.stringify(resp.data.data));
                                    _this.$router.push({path: "/menu"})
                                }
                            })
                        
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>