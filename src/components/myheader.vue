<template>
  <div id="header">
    <div class="header-box">
      <p class="text-align-right">hi, 
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ myUsername }} {{allname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" v-if="myUserType==='1' || myUserType==='2'">修改密码</el-dropdown-item>
            <el-dropdown-item command="c" v-if="myUserType==='3'">修改邀请码</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form" ref="form">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpassword">
          <el-input v-model="form.oldpassword" type="password" autocomplete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpassword">
          <el-input v-model="form.newpassword" type="password" autocomplete="off" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form', 'pwd')">取 消</el-button>
        <el-button type="primary" @click="pwdChange">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改邀请码" :visible.sync="dialogFormVisible2" width="30%" center>
      <el-form :model="codeForm" ref="codeForm">
        <el-form-item label="新邀请码" :label-width="formLabelWidth" prop="newcode">
          <el-input v-model="codeForm.code" type="password" autocomplete="off" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('codeForm', 'code')">取 消</el-button>
        <el-button type="primary" @click="codeChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'myheader',
  data () {
    return {
      allname: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      codeForm: {},
      form: {
        oldpassword: '',
        newpassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    myUsername () {
      return this.$store.getters.getUsername
    },
    myUserType () {
      return this.$store.getters.getUserType
    }
  },
  mounted () {
    this.showUserType()
  },
  methods: {
    handleCommand(command){
      if (command === 'a') {
        this.dialogFormVisible = true
      } else if (command === 'c') {
        this.dialogFormVisible2 = true
      } else {
        this.afresh('已退出！', 'success')
      }
    },
    showUserType () {
      if (this.myUserType === '1') {   
        this.allname = ''
      } else if (this.myUserType === '3') {
        this.allname = '(超级管理员)'
      } else {
        this.allname = '(管理员)'
      }
    },
    resetForm(formName, val){
      this.$refs[formName].resetFields();
      if (val === 'pwd') {
        this.dialogFormVisible = false
      } else {
        this.dialogFormVisible2 = false
      }
    },
    pwdChange () {
      this.axios({
        url: this.HOST + '/updatepassword',
        method: 'post',
        params: {},
        data: {
          oldpassword: this.$md5(this.form.oldpassword),
          newpassword: this.$md5(this.form.newpassword)
        },
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.dialogFormVisible = false
          this.resetForm('form')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          });
        }
      })
    },
    codeChange () {
      this.axios({
        url: this.HOST + '/updatecode',
        method: 'post',
        params: {},
        data: {
          code: this.codeForm.code
        },
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.dialogFormVisible2 = false
          this.resetForm('form')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<style lang="less">
#header{
  background: #000;
  color: #fff;
  height: 45px;
  margin-bottom: 12px;
  .header-box{
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
    .el-icon-arrow-down{
      color: #fff;
    }
    .el-dropdown-selfdefine{
      color: #fff;
    }
  }
}
</style>
