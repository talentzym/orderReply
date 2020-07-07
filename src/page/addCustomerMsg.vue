<template>
  <div id="add-account-msg">
    <div class="content-box">
      <h2>客户信息录入</h2>
      <div class="step-one" v-if="stepOne">
          <el-form ref="form" :model="form" label-width="150px" class="formbox" :inline="true" :rules="rules">
            <el-form-item label="公司名称" prop="gongsimingcheng">
              <el-input v-model="form.gongsimingcheng" class="inputWidth" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="lianxidianhua">
              <el-input v-model="form.lianxidianhua" class="inputWidth" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="联系手机" prop="lianxishouji">
              <el-input v-model="form.lianxishouji" class="inputWidth" placeholder="请输入联系手机"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="lianxiren">
              <el-input v-model="form.lianxiren" class="inputWidth" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="传真号码" prop="chuanzhenhaoma">
              <el-input v-model="form.chuanzhenhaoma" class="inputWidth" placeholder="请输入传真号码"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="gongsidizhi">
              <el-input v-model="form.gongsidizhi" class="inputWidth" placeholder="请输入公司地址"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="youbian">
              <el-input v-model="form.youbian" class="inputWidth" placeholder="请输入邮编"></el-input>
            </el-form-item>
            <el-form-item label="客户归属" prop="youbian">
              <el-input v-model="form.kehuguishu" class="inputWidth" placeholder="请输入客户归属"></el-input>
            </el-form-item>
            <el-form-item label="客服部人员" prop="youbian">
              <el-input v-model="form.kefuburenyuan" class="inputWidth" placeholder="请输入客服部人员"></el-input>
            </el-form-item>
            <el-form-item label="运营部部人员" prop="youbian">
              <el-input v-model="form.yunyingburenyuan" class="inputWidth" placeholder="请输入客服部人员"></el-input>
            </el-form-item>
            <el-form-item label="设计部人员" prop="youbian">
              <el-input v-model="form.shejiburenyuan" class="inputWidth" placeholder="请输入设计部人员"></el-input>
            </el-form-item>
            <el-form-item label="新签业务员" prop="youbian">
              <el-input v-model="form.xinqianyewuyuan" class="inputWidth" placeholder="请输入新签业务员"></el-input>
            </el-form-item>
            <el-form-item label="合作时间" prop="youbian">
              <el-date-picker
                v-model="form.entrytime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                @change="getTime1"
                value-format="yyyy-MM-dd"
                class="date-input">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" prop="youbian">
              <el-date-picker
                v-model="form.outtime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                @change="getTime2"
                value-format="yyyy-MM-dd"
                class="date-input">
              </el-date-picker>
            </el-form-item>
            <div class="step-one-group">
              <el-button type="primary" @click="stepOneSubmit('form')">下一步</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </div>
          </el-form>
      </div>

      <div class="step-two" v-if="!stepOne">
         <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
            <el-form-item
            v-for="(item, index) in dynamicValidateForm.domains"
            :label="'子项目' + (index + 1)"
            :key="item.key"
            :prop="'domains.' + index + '.msg'">
                <el-form-item label="类型" :prop="'domains.' + index + '.leixing'">
                    <el-select v-model="item.leixing" placeholder="请选择网站类型">
                        <el-option label="阿里巴巴" value="阿里巴巴"></el-option>
                        <el-option label="企业网站" value="企业网站"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="旺号" :prop="'domains.' + index + '.wanghao'">
                    <el-input v-model="item.wanghao" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="密码" :prop="'domains.' + index + '.mima'">
                    <el-input v-model="item.mima" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="别名" :prop="'domains.' + index + '.bieming'">
                    <el-input v-model="item.bieming" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="店铺链接" :prop="'domains.' + index + '.lianjie'">
                    <el-input v-model="item.lianjie" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="关键词" :prop="'domains.' + index + '.guanjianzi'">
                    <el-tag v-for="(span, i) in (item.guanjianzi === '' ? '' : item.guanjianzi.split(','))" :key="i" v-show="i <= 2">{{ span }}</el-tag>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addKeyword(item.guanjianzi, index)"></el-button>
                </el-form-item>
                <el-button @click.prevent="removeDomain(item)" class="delete-son">删除</el-button>
          </el-form-item>
          <el-form-item class="btn-group">
            <el-button @click="addDomain">新增子项目</el-button>
            <el-button @click="stepOne = true">上一步</el-button>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')" style="margin-left:50px;">提交</el-button>
            <el-button type="primary" @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-dialog :title="'编辑关键词：共'+(this.keword_form.desc==''?'0':this.keword_form.desc.split('\n').length)+'个'" :visible.sync="dialogVisible">
          <el-form ref="keword_form" :model="keword_form">
              <el-form-item label="">
                  <el-input type="textarea" v-model="keword_form.desc" style="width:100%;!important"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="keywordSubmit">确 定</el-button>
          </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    let validatePhone= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          const reg = this.regex.phone
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的手机号码'))
          }
        }
      };
    return {
      stepOne: true,
      dialogVisible: false,
      formLabelWidth: '80px',
      startTime: '',
      endTime: '',
      form: {
        gongsimingcheng: '',
        lianxidianhua: '',
        lianxishouji: '',
        lianxiren: '',
        chuanzhenhaoma: '',
        gongsidizhi: '',
        youbian: '',
        kehuguishu: '',
        kefuburenyuan: '',
        yunyingburenyuan: '',
        shejiburenyuan: '',
        xinqianyewuyuan: '',
        entrytime: '',
        outtime: ''
      },
      rules: {
        gongsimingcheng: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        lianxishouji: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        lianxiren: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        gongsidizhi: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ]
      },
      keword_form:{
          desc: ''
      },
      dynamicValidateForm: {
          domains: [
              {
                  leixing: '',
                  wanghao: '',
                  mima: '',
                  bieming: '',
                  lianjie: '',
                  guanjianzi: ''
              }
          ]
      },
      index: 0
    }
  },
  mounted () {
    let token = sessionStorage.getItem('Authorization');
    if (token === null || token === '') {
      this.afresh('请登录！', 'warning')
    }
  },
  watch: {
    dialogVisible: function(val) {
      this.$nextTick(function() {
        if (val == true) {
          console.log('进这里了')
          if(this.keword_form.desc && this.keword_form.desc !==''){
            this.keword_form.desc = this.dynamicValidateForm.domains[this.index].guanjianzi.replace(/,/g,"\n")
          }
        }
      });
    }
  },
  methods: {
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
          if (valid) {
              // console.log('111')
              let arr = this.dynamicValidateForm.domains
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].wanghao === '' && arr[i].bieming === '' && arr[i].guanjianzi === '' && arr[i].mima === '' && arr[i].lianjie === '' && arr[i].leixing === '') {
                  break;
                } else {
                  this.form.sonform = this.dynamicValidateForm
                }
              }
              console.log(this.form)
              this.axios({
                url: this.HOST + '/addcustominfo',
                method: 'post',
                params: {},
                data: this.form,
                timeout: 5000,
              }).then((res) => {
                // console.log(res)
                if (res.data.code === 200){
                  this.$message({
                    type: 'success',
                    message: '录入成功!'
                  });
                  this.reload();
                } else if (res.data.code === 100) {
                  this.afresh('请登录！', 'warning')
                }
              })
          }
      })
    },
    getTime1 (date) {
      this.entrytime = date;
    },
    getTime2 (date) {
      this.outtime = date;
    },
    resetForm (formData) {
      this.$refs[formData].resetFields();
    },
    stepOneSubmit (formData) {
       this.$refs[formData].validate((valid) => {
          if (valid) {
              this.stepOne = false
              // console.log(this.form)
          }
      })
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
          leixing: '',
          wanghao: '',
          mima: '',
          bieming: '',
          lianjie: '',
          guanjianzi: ''
      });
    },
    addKeyword (item, i) {
        this.index = i
        console.log(item)
        if (this.dynamicValidateForm.domains[i].guanjianzi) {
            let deseText = this.dynamicValidateForm.domains[i].guanjianzi.replace(/,/g,"\n")
            this.keword_form.desc = deseText
        }
        this.dialogVisible = true
    },
    keywordSubmit () {
      let descValue = this.keword_form;
      console.log(descValue);
      if(descValue.desc && descValue.desc !==''){
        descValue.desc = descValue.desc.replace(/\n/g,",")
      }
      console.log(descValue);
      // let deseArr = descValue.split("\n")
      // // console.log(deseArr)
      let i = this.index
      if (descValue) {
        this.dynamicValidateForm.domains[i].guanjianzi = descValue.desc
      } else {
        this.dynamicValidateForm.domains[i].guanjianzi = ''
      }
      console.log(this.dynamicValidateForm.domains[i].guanjianzi)
      console.log(this.dynamicValidateForm.domains)
      // this.keword_form.desc = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less">
#add-account-msg{
  .el-textarea__inner {
      width: 100%!important;
      height: 250px;
  }
  .el-textarea__inner{
    border: 1px solid #409eff;
  }
  .el-tag{
      margin-right: 8px;
  }
  .content-box{
    width: 1200px;
    margin: 0 auto;
    padding: 0 50px;
    .formbox{
      padding-left: 22px;
      margin-top: 30px;
    }
    .formbox{
      padding-left: 22px;
      .el-form-item__content{
        margin-left: 0!important;
        margin-bottom: 10px;
      }
      .delete-btn{
        margin-left: 80px;
      }
    }
    .add-btn{
      margin-left: 80px;
    }
  }
  .formbox{
    .step-one-group{
      margin-left: 150px!important;
    }
  }
  .step-two{
    margin-top: 30px;
    .el-input{
      margin-bottom: 20px;
    }
    .delete-son{
      margin-left: 360px;
    }
    .btn-group{
      margin-top: 30px;
    }
  }
  .inputWidth{
    width: 350px!important;
  }
  .date-input{
    width: 350px;
  }
}
</style>
