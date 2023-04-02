<!-- <template>
  <div class="box">
    <el-upload class="upload-demo" ref="upload" action="http://localhost:8081/cm/upLoad"
      :on-preview="handlePreview" :on-remove="handleRemove"  :on-success="handleAvatarSuccess" :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-input v-model="imageUrl"></el-input>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
 export default {
    data() {
      return {
        fileList: [],
        imageUrl: '1'
      };
    },
    methods: {
      submitUpload() {
        console.log(this.$refs.upload)
        this.$refs.upload.submit();
      
        
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        
      },
      handleAvatarSuccess(res){
          this.imageUrl = res
      }
    }
  }
</script> -->


<!-- 
<template>
  <el-upload
  class="upload-demo"
  action="http://localhost:8081/cm/upLoad"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleAvatarSuccess"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <el-input v-model="imageUrl"></el-input>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        imageUrl:''
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      } ,
      handleAvatarSuccess(res){
          this.imageUrl = res
      }
    }
  }
</script> -->

<template>
  <el-form ref="form" :rules="rules" :model="cm" label-width="80px" style="width: 600px">
      <el-form-item label="图片" prop="mimage">
          <el-input v-model="cm.mimage"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="mname">
          <el-input v-model="cm.mname"></el-input>
      </el-form-item>
      <el-form-item label="种类" prop="mtype">
          <el-input v-model="cm.mtype"></el-input>
          <!-- <el-upload class="upload-demo" action="http://localhost:8081/cm/upLoad" :on-preview="handlePreview"
              :on-remove="handleRemove" :on-success="handleAvatarSuccess" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              
          </el-upload> -->
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
          <el-button type="primary" @click="onSubmit('form')">添&nbsp;&nbsp;&nbsp;加</el-button>
          <el-button type="primary" @click="back()">取消</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
export default {
  name: "Add",
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
          fileList: [],
          rules: {
              mname: [
                  { required: true, message: '请输入中药名称', trigger: 'blur' }
              ],
              mimage: [
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

  methods: {
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  let _this = this
                  axios.put('http://localhost:8081/cm/addMedical', this.cm).then(function (response) {
                      if (response.data) {
                          _this.$alert(_this.cm.mname + '添加成功！', '添加数据', {
                              confirmButtonText: '确定',
                              callback: action => {
                                  //跳转到/usermsg
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
    } ,
    handleAvatarSuccess(res){
        this.cm.mtype = res
    }
  }
}
</script>

<style scoped></style>