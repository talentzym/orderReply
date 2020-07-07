<template>
  <div id="account-msg">
    <div class="basics-msg">
      <el-form :model="information">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="information.loginname" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="information.lianxidianhua"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="information.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth">
          <el-input v-model="information.weixin"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-select v-model="information.departid" placeholder="请选择部门">
            <el-option :label="item.name" :value="item.id" v-for="item in depart" :key="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="information.entry"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            @change="getTime"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="changeModifyFlag">修改</el-button> -->
          <el-button type="primary" @click="modifyUserMsg" class="true-btn">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelWidth: '150px',
      formLabelWidth1: '80px',
      information: {},
      entry: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      depart: []
    }
  },
  mounted () {
    this.getMyData()
    this.getDepart()
  },
  computed: {
    myUserType () {
      return this.$store.getters.getUserType
    }
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
    getMyData () {
      this.axios({
        url: this.HOST + '/userinfosssss',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          this.information = res.data.data[0]
        } else if (res.data.code === 100) {
          this.afresh('请登录！', 'warning')
        }
      })
    },
    getTime (date) {
      this.entry = date;
      // console.log(this.entry);
    },
    modifyUserMsg () {
      // console.log(this.information)
      this.information.entry = this.entry
      this.axios({
        url: this.HOST + '/updateuser',
        method: 'post',
        params: {},
        data: this.information,
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '提交成功！'
        });
        this.getMyData()
      })
    }
  }
}
</script>

<style lang="less">
#account-msg{
  .basics-msg{
    margin-bottom: 50px;
    .el-form-item{
      margin-right: 50px;
    }
    .el-input{
      width: 290px;
    }
  }
  .attached-msg {
    .attached-title{
      display: inline-block;
    }
    .addSonProject{
      margin-top: 50px;
      margin-left: 50px;
    }
  }
  .el-select{
    .el-input{
      width: 185px;
    }
  }
  .true-btn{
    margin-left: 150px;
  }
}

</style>
