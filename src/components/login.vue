<template>
  <div id="login-model">
    <div class="login-box">
        <p class="font-size-24 font-weight-400 margin-bottom-30 text-align-center">登录</p>
        <div class="ctbox">
          <el-form :model="login_form" :rules="login_rules" ref="login_form">
            <el-form-item label="" prop="username">
              <el-input v-model="login_form.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input placeholder="请输入密码" v-model="login_form.password" auto-complete="off"
                type="password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="" @click="login('login_form')" type="success">登录</el-button>
              <p @click="goRegister" class="font-size-12 margin-top-20 cursor-pointer">注册</p>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      loginFlag: true,
      login_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      login_form: {
        username: null,
        password: null
      }
    }
  },
  computed: {
    myUserType () {
      return this.$store.getters.getUserType
    }
  },
  created () {
    let token = sessionStorage.getItem('Authorization');
    if (token !== null) {
      this.routerReplace('/home')
    }
  },
  methods: {
    ...mapMutations(['changeLogin', 'changeUsername', 'changeUserType']),
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            url: this.HOST + '/login',
            method: 'post',
            params: {},
            data: {
              username: this.login_form.username,
              password: this.$md5(this.login_form.password)
            },
            timeout: 5000
          }).then((res)=>{
            // console.log(res)
            if (res.data.code === 200) {
              this.changeLogin({ Authorization: res.data.token });
              this.changeUsername({ username: res.data.username });
              this.changeUserType({ userType: res.data.userType });
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              if (this.myUserType === '1') {
                this.routerLink('/home')
              } else {
                this.routerLink('/allOrder')
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })    
        }
      })
    },
    goRegister () {
      this.routerLink('/register')
    }
  }
}
</script>

<style lang="less">
#login-model{
  padding: 10% 0 0 0;
  .ctbox{
    width: 20%;
    margin: 0 auto;
    padding: 50px 50px;
    border:1px solid #eee;
    text-align: center;
  }
  .register-box{
    .el-select {
      display: block;
    }
  }
}

</style>