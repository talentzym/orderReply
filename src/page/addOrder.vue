<template>
  <div id="add-order">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="问题标题" prop="title">
          <el-input v-model="ruleForm.title" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="提给" prop="departid">
          <el-cascader
            v-model="ruleForm.departall"
            :options="options"
            @change="changeDepart"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label="问题描述" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" ref="uploadElement" prop="file">
            <el-upload
              :data="ruleForm"
              action="#"
              name="file"
              list-type="picture-card"
              ref="upload"
              :limit="limit"
              :auto-upload="false"
              :http-request="uploadOrderImg"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      options: [],
      ruleForm: {
        title: '',
        departall: [],
        content: ''
      },
      result: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      limit: 1,
      rules: {
          title: [
            { required: true, message: '请输入工单标题', trigger: 'blur' },
            { max: 80, message: '字数超限', trigger: 'blur' }
          ],
          departall: [
            { message: '请输入提问类型以及部门', trigger: 'change' },
          ],
          content: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  created () {
    this.getDepartall()
  },
  methods: {
    materialPictureAndText(){
      return this.HOST + '/addask'
    },
    changeDepart(value) {
      console.log(value);
      this.ruleForm.departall = value
    },
    getDepartall () {
      this.axios({
        url: this.HOST + '/querydepartquestion',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        this.options = res.data
      }).catch( res => {
          console.log(res)
      })
    },
    submitForm (formName) {
        let vm = this;
        // console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.result = new FormData()
              this.$refs.upload.submit();
              this.result.append('title', this.ruleForm.title);
              this.result.append('departid', this.ruleForm.departall[0]);
              this.result.append('questionTypeId', this.ruleForm.departall[1]);
              this.result.append('content', this.ruleForm.content);
              this.result.append('tihuojie', 0);
              let config = {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }
              this.axios.post(this.HOST + '/addask', this.result, config).then( res => {
                  // console.log(res)
                  if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '工单提交成功！'
                    });
                    this.$refs[formName].resetFields();
                    this.$refs.upload.clearFiles();
                    this.ruleForm.departall = []
                  } else if (res.data.code === 100) {
                    this.afresh('请重新登录！', 'warning')
                  }
              }).catch( res => {
                  console.log(res)
              })
            } else {
                return false;
            }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
      this.ruleForm.departall = []
    },
    uploadOrderImg (item) {
      // console.log(item)
      this.result.append('file', item.file); 
    },
    handleSuccess(res, file) {
        this.$message({
            type: 'info',
            message: '图片上传成功',
            duration: 6000
        });
        this.$refs.ruleForm.resetFields();
        this.$refs.upload.clearFiles();
    },
    handleRemove(file) {
      this.$message({
          type: 'info',
          message: '已删除原有图片',
          duration: 6000
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange (file) {
      this.result = file.raw
    },
    handleExceed (file, fileList) {
      if (fileList.length>=1){
        this.$message.warning(`最多上传 ${this.limit} 个文件。`);
      }
    }
  }
}
</script>

<style lang="less">

</style>
