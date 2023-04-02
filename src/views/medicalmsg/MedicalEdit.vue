<template>
    <el-form ref="form" :rules="rules" :model="cm" label-width="80px" style="width: 600px">
        <el-form-item label="ID" prop="mid">
            <el-input v-model="cm.mid" readonly></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="mimage" readonly>
            <el-input v-model="cm.mimage"></el-input>
            <el-upload class="upload-demo" action="http://localhost:8081/cm/upLoad" :on-preview="handlePreview"
                :on-remove="handleRemove" :on-success="handleAvatarSuccess" :file-list="fileList" list-type="picture">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="mname">
            <el-input v-model="cm.mname"></el-input>
        </el-form-item>
        <el-form-item label="种类" prop="mtype" >
            <el-select v-model="cm.mtype" placeholder="请选择">
                <el-option v-for="item in options" :key="item.tName" :label="item.tName" :value="item.tName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="功效" prop="mwork">
            <el-input v-model="cm.mwork"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="mprice">
            <el-input v-model.number="cm.mprice"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="minventory">
            <el-input v-model.number="cm.minventory"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="mintroduction">
            <el-input v-model="cm.mintroduction"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">编&nbsp;&nbsp;&nbsp;辑</el-button>
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
            cm: {
                mid: '',
                mname: '',
                mimage: '',
                mtype: '',
                mwork: '',
                mintroduction: '',
                mprice: '',
                minventory: '',

            },
            options: [],
            rules: {
                mname: [
                    { required: true, message: '请输入中药名称', trigger: 'blur' }
                ],
                upassmimageword: [
                    { required: true, message: '请输入图片地址', trigger: 'blur' }
                ],
                mtype: [
                    { required: true, message: '请输入药品种类', trigger: 'blur' }
                ],
                mwork: [
                    { required: true, message: '请输入中药疗效', trigger: 'blur' }
                ],
                mintroduction: [
                    { required: true, message: '请输入中药的简介', trigger: 'blur' }
                ],
                mprice: [
                    { required: true, message: '请输入药品价格', trigger: 'blur' },
                    { type: 'number', message: '价格需要为数字值' }
                ],
                minventory: [
                    { required: true, message: '请输入药品库存', trigger: 'blur' },
                    { type: 'number', message: '库存量需要为数字值' }
                ]

            }
        }
    },
    created() {
        let id = this.$route.query.id
        let _this = this
        axios.get('http://localhost:8081/cm/findmbyid/' + id).then(function (response) {
            _this.cm = response.data
        })
        this.getType()
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _this = this
                    axios.put('http://localhost:8081/cm/updateMedical', this.cm).then(function (response) {
                        if (response.data) {
                            _this.$alert(_this.cm.mname + '编辑成功！', '编辑数据', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push('/medicalmsg')
                                }
                            });
                        }
                    })
                }
            });
        },
        back() {
            this.$router.push('/medicalmsg')
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleAvatarSuccess(res) {
            this.cm.mimage = res
        },
        getType(){
        var _this = this
        axios.get('http://localhost:8081/type/getSelectType').then(function(response){
            _this.options = response.data.list
            console.log(_this.options)
        })
    },
    }
}
</script>

<style scoped></style>