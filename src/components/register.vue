<template>
  <div id="register-model">
     <div class="register-box">
        <p class="font-size-24 font-weight-400 margin-bottom-30 text-align-center">注册</p>
        <div class="ctbox">
          <el-form :model="register_form" :rules="register_rules" ref="register_form">
            <el-form-item label="" prop="username">
              <el-input v-model="register_form.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input placeholder="请输入密码" v-model="register_form.password" auto-complete="off"
                type="password">
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="departid">
              <el-select v-model="register_form.departid" placeholder="请选择部门">
                <el-option :label="item.name" :value="item.id" v-for="item in depart" :key="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="departid">
              <el-input placeholder="请输入邀请码" v-model="register_form.code" auto-complete="off"
                type="password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="" @click="register('register_form')" type="success">注册</el-button>
              <p @click="goLogin" class="font-size-12 margin-top-20 cursor-pointer">登录</p>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      depart: [],
      register_form: {
        username: '',
        password: '',
        departid: '',
        code: ''
      },
      register_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        departid: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDepart()
  },
  methods: {
    getDepart () {
      this.axios({
        url: this.HOST + '/departall',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        this.depart = res.data
      }).catch( res => {
          console.log(res)
      })
    },
    goLogin () {
      this.routerLink('/login')
    },
    register (formName) {
      console.log(this.register_form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = {
            username: this.register_form.username,
            password: this.$md5(this.register_form.password),
            departid: this.register_form.departid,
            code: this.register_form.code,
            userType: '1'
          }
          this.axios({
            url: this.HOST + '/register',
            method: 'post',
            params: {},
            data: result,
            timeout: 5000
          }).then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.routerLink('/login')
            } else{
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }).catch( res => {
              console.log(res)
          })
        }
      })
      
    }
  }
}
</script>

<style lang="less">
#register-model{
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
