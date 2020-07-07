<template>
  <div id="order-page">
    <el-page-header @back="goBack" content="工单详情"></el-page-header>
    <div class="order-msg">
      <table class="gd_infotable">
        <tbody>
          <tr>
            <td align="right" width="90">工单题目：</td>
            <td align="left">
            部门： {{ depart }}<br>标题： <span class="fred" style="font-size:16px">{{ orderTitle }}</span>
            </td>
          </tr>
          <tr>
            <td align="right">工单编号：</td><td align="left"> {{ orderId }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="order-content">
      <ul class="gd_message">
        <li v-for="(item, index) in dataList" :key="index" class="clearfix">
          <div :class="item.tijie === '1' ? 'gd_user' : 'gd_manage'">
            <div v-if="item.tijie === '1'">
                <div class="user_left">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <br>{{ item.tichuuser === myUserName ? '我' : item.tichuuser }}的提问<br>
                  <span class="tw_time">{{item.createtime}}</span>
                </div>
                <div class="rcontent user_right">
                  <p>{{ item.content }}</p>
                  <viewer :images="item.urls">
                      <img v-for="(arr, i) in item.urls" :key="i" :src="arr">
                  </viewer>
                </div>
            </div>
            <div v-if="item.tijie === '0'">
                <div class="manage_left">
                  <div class="rcontent message_con">
                    <p>{{ item.content }}</p>
                    <viewer :images="item.urls">
                        <img v-for="(arr, i) in item.urls" :key="i" :src="arr">
                    </viewer>
                  </div>
                </div>
                <div class="manage_right"><el-avatar icon="el-icon-user-solid"></el-avatar><br>{{ item.jiejueuser === myUserName ? '我' : item.jiejueuser }}的回复<br><span class="tw_time">{{ item.createtime }}</span></div>
            </div>

          </div>
        </li>
      </ul>
    </div>
    <div class="yiwen_l" v-if="editFlag">
      <a href="javascript:void(0);" v-if="myUserType === '1' && tichuzhe !== myUserName" @click="showreplay('answer')" class="yw_btn yw_btn_orange ml-30"><i></i>我来回答</a>
      <a href="javascript:void(0);" v-if="myUserType === '1' && tichuzhe === myUserName" class="yw_btn yw_btn_blue" @click="overOrder"><i></i>已解决</a>
      <a href="javascript:void(0);" v-if="myUserType === '1' && tichuzhe === myUserName" @click="showreplay('question')" class="yw_btn yw_btn_orange ml-30"><i></i>继续提问</a>
    </div>
    <div class="reply" v-if="dialogFlag">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item prop="file">
          <el-upload
            :data="form"
            class="upload-demo"
            ref="upload"
            name="file"
            action="#"
            :limit="limit"
            :auto-upload="false"
            :http-request="uploadOrderImg"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">上传附件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item class="text-align-center">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFlag: false,
      limit: 1,
      form: {
        content: ''
      },
      result: '',
      fileList: [],
      dataList: [],
      orderId: 0,
      orderTitle: '',
      depart: '',
      contentStatus: '',
      editFlag: true, //为true是pending页面可编辑，false是all页面进入不可编辑
      tichuzhe: '',
      isAnswer: true
    }
  },
  computed: {
    iid () {
      return this.$route.params.id
    },
    pageName () {
      return this.$route.params.pageName
    },
    myUserType () {
      return this.$store.getters.getUserType
    },
    myUserName () {
      return this.$store.getters.getUsername
    }
  },
  created () {
    this.$nextTick(()=>{
      this.getDataList() 
    })
  },
  mounted () {
  },
  methods: {
    goBack () {
      console.log(this.pageName)
      if (this.pageName === 'all') {
          this.routerLink('/allOrder')
      } else if (this.pageName === 'pending') {
          this.routerLink('/pendingOrder')
      } else if (this.pageName === 'processing'){
          this.routerLink('/processing')
      } else if (this.pageName === 'myquestion'){
          this.routerLink('/myQuestion')
      } else if (this.pageName === 'myanswered'){
          this.routerLink('/myAnswered')
      } else if (this.pageName === 'isover'){
          this.routerLink('/isOver')
      }
    },
    showreplay (flag) {
      this.axios({
        url: this.HOST + '/askstatus',
        method: 'get',
        params: {
          id: this.iid
        },
        data: {},
        timeout: 5000,
      }).then((res) => {
        if (res.data.contentstatus !== '2') {
          console.log(11111)
          if (!this.dialogFlag) {
            this.dialogFlag = true
          } else {
            this.dialogFlag = false
          }
          if (flag === 'answer') {
            this.isAnswer = true
          } else {
            this.isAnswer = false
          }
        } else {
          console.log(22222)
          this.$alert('此问题已关闭，无法继续回答', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.getDataList()
            }
          });
        }
      })
    },
    uploadOrderImg (item) {
      console.log(item)
      this.result.append('file', item.file); 
    },
    handleExceed (file, fileList) {
      // console.log(fileList)
      if (fileList.length>=1){
        this.$message.warning(`最多上传 ${this.limit} 个文件。`);
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleChange (file) {
      // console.log(file)
      this.result = file.raw
    },
    getDataList () {
      this.axios({
          url: this.HOST + '/askdetail',
          method: 'get',
          params: {
            id: this.iid
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            this.dataList = res.data.data
            this.tichuzhe = res.data.data[0].tichuuser
            this.contentStatus = res.data.contentstatus
            if (this.pageName === 'all') {
                this.editFlag = false
            } else {
              if (this.contentStatus === '2') {
                this.editFlag = false
              } else {
                this.editFlag = true
              }
            }
            this.orderId = res.data.askid
            this.depart = res.data.depart
            this.orderTitle = res.data.title
          } else if (res.data.code === 100) {
            this.afresh('请重新登录！', 'warning')
          }
        })
    },
    onSubmit (formName) {
        let vm = this;
        // console.log(this.ruleForm)
        let tihuojie = 0
        if (this.isAnswer) {
          tihuojie = 1
        } else {
          tihuojie = 0
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.result = new FormData()
              this.$refs.upload.submit();
              this.result.append('content', this.form.content);
              this.result.append('id', this.iid);
              this.result.append('tihuojie', tihuojie);
              let config = {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }
              // console.log(this.result)
              this.axios.post(this.HOST + '/addask', this.result, config).then( res => {
                  // console.log(res)
                  if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '提交成功！'
                    });
                    this.getDataList()
                    this.$refs[formName].resetFields();
                    this.$refs.upload.clearFiles();
                    this.dialogFlag = false
                  }
              }).catch( res => {
                  console.log(res)
              })
            } else {
                return false;
            }
        });
    },
    overOrder () {
      this.axios({
        url: this.HOST + '/guandan',
        method: 'get',
        params: {
          id: this.iid
        },
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$message({
              type: 'success',
              message: '已关闭问题！'
          });
          this.getDataList()
        } else if (res.data.code === 100) {
          this.afresh('请重新登录！', 'warning')
        }
      })
    }
  }
}
</script>

<style lang="less">
#order-page{
  width: 100%;
  .order-msg{
    border: 1px solid #a7deff;
    background: #f1faff;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    .gd_infotable {
      width: 100%;
      margin: auto;
      border-collapse: collapse;
      td {
        font-size: 14px;
        padding: 5px 0;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .order-content{
    padding-bottom: 50px;
    .gd_message {
      overflow: hidden;
      zoom: 1;
      font-size: 14px;
      padding-top: 15px;
      .gd_user {
          float: left;
      }
      .gd_manage {
          float: right;
      }
      .rcontent{
        img{
          width: 80px;
          height: 80px;
          // object-fit: cover;
        }
      }
      .user_left {
          float: left;
          margin-right: -1px;
          z-index: 2;
          position: relative;
          margin-top: 10px;
          display: inline-block;
          text-align: right;
          font-size: 14px;
          padding-right: 13px;
          img {
              border: 0;
              vertical-align: middle;
          }
      }
      .tw_time {
          color: #666;
          font-size: 12px;
      }
      .user_right {
          float: left;
          background: #f8f9fd;
          border: 1px solid #e2e3e4;
          border-radius: 5px;
          padding: 10px;
          line-height: 22px;
          width: 620px;
          font-size: 14px;
          word-wrap: break-word;
          word-break: break-all;
          color: #444444;
          margin-top: 10px;
          position: relative;
      }
      .manage_left {
          float: left;
          position: relative;
          background: #fffef5;
          border: 1px solid #ede6ae;
          border-radius: 5px;
          padding: 10px;
          width: 620px;
          word-wrap: break-word;
          word-break: break-all;
          margin-top: 10px;
      }
      .manage_right {
          // background: url(/newimages/Manager/gongdan/iconimg.gif) no-repeat left -1678px;
          float: left;
          margin-left: -1px;
          z-index: 2;
          position: relative;
          margin-top: 10px;
          display: inline-block;
          text-align: left;
          font-size: 14px;
          padding-left: 13px;
      }
    }
  }
  .yiwen_l {
      border-top: 1px solid #dfdfdf;
      text-align: center;
      margin: 0 auto;
      padding: 20px 0;
      margin-top: 30px;
      .yw_btn {
          &:hover{
            color: #fff;transition: all .2s cubic-bezier(0.4,0,.2,1) 0s;
          }
          display: inline-block;
          width: 240px;
          height: 48px;
          line-height: 46px;
          background: #fff;
          border-radius: 4px;
          font-size: 16px;
          text-indent: 0;
          i {
              display: inline-block;
              width: 24px;
              height: 24px;
              background: url('../assets/image/question-show-icon.png') no-repeat;
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 8px;
          }
      }
      .yw_btn_blue {
          &:hover{
            background: -webkit-linear-gradient(left, #2086ee , #23c0fa); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #2086ee, #23c0fa); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #2086ee, #23c0fa); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #2086ee , #23c0fa); /* 标准的语法 */
            i{background-position: 0 -34px}
          }
          border: 1px solid #89b0ff;
          color: #3992ff;
          i {
            background-position: 0 0;
          }
      }
      .ml-30 {
          margin-left: 30px;
      }
      .yw_btn_orange {
          &:hover{
            background: -webkit-linear-gradient(left, #ffa155 , #edc730); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #ffa155, #edc730); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #ffa155, #edc730); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #ffa155 , #edc730); /* 标准的语法 */
            i{background-position: -34px -34px}
          }
          border: 1px solid #ffc392;
          color: #ffa155;
          i {
            background-position: -34px 0;
          }
          
          
      }
  }
  .reply{
    .el-textarea__inner{
      min-height: 150px!important;
      margin: 0 auto;
    }
    .upload-demo{
      width: 220px;
      margin-left: 200px;
    }
  }
}
</style>
