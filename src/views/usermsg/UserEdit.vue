<template>
    <el-form ref="form" :rules="rules" :model="user" label-width="80px" style="width: 600px">
        <el-form-item label="用户ID">
            <el-input v-model="user.uid" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
            <el-input v-model="user.uname"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="uaccount">
            <el-input v-model="user.uaccount" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
            <el-input v-model="user.upassword"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="uidcard">
            <el-input v-model="user.uidcard"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="uphoneNumber">
            <el-input v-model="user.uphoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="uaddress">
            <el-input v-model="user.uaddress"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="uage">
            <el-input v-model="user.uage"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.usex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button type="primary" @click="back()">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import axios from 'axios';
export default {
    name: "Edit",
    data() {
        return {
            user: {
                uid: '',
                uname: '',
                uaccount: '',
                upassword: '',
                uidcard: '',
                uphoneNumber: '',
                uaddress: '',
                uage: '',
                usex: ''

            },
            rules: {
                uname: [
                    { required: true, message: '请输入用户姓名', trigger: 'blur' }
                ],
                upassword: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' }
                ],
                uidcard: [
                    { required: true, message: '请输入用户的身份证', trigger: 'blur' }
                ],
                uphoneNumber: [
                    { required: true, message: '请输入用户的电话号码', trigger: 'blur' }
                ],
                uaddress: [
                    { required: true, message: '请输入用户的地址', trigger: 'blur' }
                ],

                uage: [
                    { required: true, message: '请输入用户的年龄', trigger: 'blur' }
                ]

            }
        }
    },
    created() {
        let id = this.$route.query.id
        let _this = this
        axios.get('http://localhost:8081/user/findbyid/' + id).then(function (response) {
            _this.user = response.data
        })
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _this = this
                    axios.put('http://localhost:8081/user/updateUser', this.user).then(function (response) {
                        if (response.data) {
                            _this.$alert(_this.user.uname + '修改成功！', '修改数据', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    //跳转到/usermsg
                                    _this.$router.push('/usermsg')
                                }
                            });
                        }
                    })
                }
            });
        },
        back() {
            this.$router.push('/usermsg')
        }
    }
}
</script>

<style scoped></style>