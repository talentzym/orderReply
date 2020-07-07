<template>
  <div id="account-msg">
    <el-page-header @back="goBack" :content="comName" style="margin-bottom: 30px;"></el-page-header>
    <div class="basics-msg">
      <el-form :model="information" :inline="true">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="information.gongsimingcheng"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="information.gongsidizhi"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="information.lianxiren"></el-input>
        </el-form-item>
        <el-form-item label="联系手机" :label-width="formLabelWidth">
          <el-input v-model="information.lianxishouji"></el-input>
        </el-form-item>
        <el-form-item label="传真号码" :label-width="formLabelWidth">
          <el-input v-model="information.chuanzhenhaoma"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="information.youbian"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="information.lianxidianhua"></el-input>
        </el-form-item>
        <el-form-item label="客户归属" :label-width="formLabelWidth">
          <el-input v-model="information.kehuguishu"></el-input>
        </el-form-item>
        <el-form-item label="客服部人员" :label-width="formLabelWidth">
          <el-input v-model="information.kefuburenyuan"></el-input>
        </el-form-item>
        <el-form-item label="设计部人员" :label-width="formLabelWidth">
          <el-input v-model="information.shejiburenyuan"></el-input>
        </el-form-item>
        <el-form-item label="运营部部人员" :label-width="formLabelWidth">
          <el-input v-model="information.yunyingburenyuan"></el-input>
        </el-form-item>
        <el-form-item label="新签业务员" :label-width="formLabelWidth">
          <el-input v-model="information.xinqianyewuyuan"></el-input>
        </el-form-item>
        <el-form-item label="合作时间" prop="entrytime" :label-width="formLabelWidth">
          <el-date-picker
            :disabled="myUserType === '1'"
            v-model="information.entrytime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="date-input">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="outtime" :label-width="formLabelWidth">
          <el-date-picker
            :disabled="myUserType === '1'"
            v-model="information.outtime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="date-input">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="changeModifyFlag">修改</el-button>
          <!-- <el-button type="primary" @click="modifyFatherFrom">确 定</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="attached-msg">
      <p class="font-size-20 attached-title">管理子项目</p>
      <el-button type="primary" v-if="tableData" class="addSonProject" size="mini" @click="addSubForm">添加子项目</el-button>
      <div v-if="tableData">
         <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            fixed
            prop="leixing"
            label="类型">
            <template slot-scope="scope">
              <span>{{scope.row.leixing}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="wanghao"
            label="旺号">
            <template slot-scope="scope">
              <span>{{scope.row.wanghao}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mima"
            label="密码">
            <template slot-scope="scope">
              <span>{{scope.row.mima}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bieming"
            label="别名">
            <template slot-scope="scope">
              <span>{{scope.row.bieming}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lianjie"
            label="站点链接">
            <template slot-scope="scope">
              <a :href="scope.row.lianjie"
                target="_blank"
                class="buttonText">{{scope.row.lianjie}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="guanjianci"
            label="关键词">
            <template slot-scope="scope">
                <el-tag size="mini" v-for="(span, i) in scope.row.guanjianci" :key="i" v-show="i <= 2">{{ span === '' ? '未录入' : span }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native="handleEdit(scope.row)">编辑</el-button>
              <el-button slot="reference" type="text" size="small" @click.native="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="子项目信息" :visible.sync="dialogFormVisible">
      <el-form :model="tableColumn"  ref="tableColumn" :inline="true">
        <el-form-item label="类型" :label-width="formLabelWidth1" prop="leixing">
          <el-select v-model="tableColumn.leixing" placeholder="请选择网站类型">
            <el-option label="阿里巴巴" value="阿里巴巴"></el-option>
            <el-option label="企业网站" value="企业网站"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.mima" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旺号" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.wanghao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.bieming" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="站点" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.lianjie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth1" prop="guanjianci">
          <el-tag size="mini" v-for="(span, i) in tableColumn.guanjianci" :key="i" v-show="i <= 2">{{ span }}</el-tag>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addKeyword(tableColumn.guanjianzi)"></el-button>
        </el-form-item>
        <el-form-item label="旺号" :label-width="formLabelWidth1" prop="wanghao">
          <el-input v-model="tableColumn.wanghao" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySomFrom('modify')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加子项目" :visible.sync="dialogFormVisible2">
      <el-form :model="tableColumn"  ref="tableColumn" :inline="true">
        <el-form-item label="类型" :label-width="formLabelWidth1" prop="leixing">
          <el-select v-model="tableColumn.leixing" placeholder="请选择网站类型">
            <el-option label="阿里巴巴" value="阿里巴巴"></el-option>
            <el-option label="企业网站" value="企业网站"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.mima" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旺号" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.wanghao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.bieming" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="站点" :label-width="formLabelWidth1" prop="bieming">
          <el-input v-model="tableColumn.lianjie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth1" prop="guanjianci">
          <el-tag size="mini" v-for="(span, i) in tableColumn.guanjianci" :key="i" v-show="i <= 2">{{ span === '' ? '未录入' : span }}</el-tag>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addKeyword(tableColumn.guanjianzi)"></el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="modifySomFrom('add')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'编辑关键词：共'+(this.keword_form.desc==''?'0':this.keword_form.desc.split('\n').length)+'个'" :visible.sync="dialogVisible">
        <el-form ref="keword_form" :model="keword_form" class="guan-box">
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
</template>

<script>
export default {
  data () {
    return {
      comName: '',
      modifyFlag: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '150px',
      formLabelWidth1: '80px',
      information: {},
      tableData: [],
      tableColumn: {},
      keyId: 0,
      rows: 0,
      keword_form: {
        desc: ''
      },
      dialogVisible: false,
      gendanTable: []
    }
  },
  mounted () {
    this.getMyData()
  },
  computed: {
    customerId () {
      return this.$route.params.id
    },
    pages () {
      return this.$route.params.currentPage
    },
    myUserType () {
      return this.$store.getters.getUserType
    }
  },
  watch: {
    dialogVisible: function(val) {
      this.$nextTick(function() {
        if (val == true) {
          if(this.keword_form.desc && this.keword_form.desc !==''){
            this.keword_form.desc = this.tableColumn.guanjianzi.replace(/,/g,"\n")
          }
        }
      });
    },
    dialogFormVisible2: function(val) {
      this.$nextTick(function() {
        if (val == true) {
          this.tableColumn.guanjianzi = ''
        }
      });
    }
  },
  methods: {
    goBack(){
        this.routerLink('/customerList')
    },
    addKeyword (msg) {
      console.log(msg)
      if (msg) {
          let deseText = msg.replace(/,/g,"\n")
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
      if (descValue.desc) {
        this.tableColumn.guanjianzi = descValue.desc
        this.tableColumn.guanjianci = descValue.desc.split(',')
      } else {
        this.tableColumn.guanjianzi = ''
        this.tableColumn.guanjianci = []
      }
      console.log(this.tableColumn.guanjianci)
      this.dialogVisible = false
    },
    getMyData () {
      this.axios({
        url: this.HOST + '/getcustomDetailsinfoonlyone',
        method: 'get',
        params: {
          id: this.customerId
        },
        data: {},
        timeout: 5000,
      }).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.information = res.data.data[0]
          this.tableData = res.data.data[0].lists
          this.comName = res.data.data[0].gongsimingcheng
          this.keyId = res.data.data[0].id
        } else if (res.data.code === 100) {
          this.afresh('请登录！', 'warning')
        }
      })
    },
    addSubForm () {
      this.tableColumn.guanjianzi = ''
      this.tableColumn.guanjianci = []
      this.dialogFormVisible2 = true
      console.log(this.tableColumn)
    },
    handleEdit (msg) {
      console.log(msg)
      this.tableColumn = msg
      // this.keword_form.desc = msg.guanjianci
      // this.rows = msg.guanjianci.length
      this.dialogFormVisible = true
    },
    handleDelete (msg) {
      console.log(msg)
      this.$confirm('删除该子项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/deleteuserdetailchild',
            method: 'post',
            params: {
              id: parseInt(msg.id)
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dialogFormVisible = false
            this.getMyData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    changeModifyFlag() {
      this.axios({
        url: this.HOST + '/updateuserdetailinfo',
        method: 'post',
        params: {},
        data: this.information,
        timeout: 5000,
      }).then((res) => {
        console.log(res)
        this.$message({
            type: 'success',
            message: '修改成功！'
        });
        this.getMyData()
      })
    },
    modifySomFrom (type) {
      console.log(this.tableColumn)
      if (type === 'modify') {
        this.axios({
          url: this.HOST + '/updateuserdetailchild',
          method: 'post',
          params: {},
          data: this.tableColumn,
          timeout: 5000,
        }).then((res) => {
          console.log(res)
          this.$message({
              type: 'success',
              message: '修改成功！'
          });
          this.dialogFormVisible = false
          this.getMyData()
        })
      } else {
        this.tableColumn.id = this.keyId
        this.axios({
          url: this.HOST + '/addchild',
          method: 'post',
          params: {},
          data: this.tableColumn,
          timeout: 5000,
        }).then((res) => {
          console.log(res)
          this.$message({
              type: 'success',
              message: '添加成功！'
          });
          this.dialogFormVisible2 = false
          this.getMyData()
        })
      }
      
    }
  }
}
</script>

<style lang="less">
#account-msg{
  .guan-box{
    .el-textarea__inner {
        width: 100%!important;
        height: 250px;
    }
  }
  .el-textarea__inner {
        width: 100%!important;
    }
  .el-textarea__inner{
    border: 1px solid #409eff;
  }
  .el-tag{
      margin-right: 8px;
  }
  .card-box{
    margin-top: 30px;
    margin-bottom: 60px;
  }
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
}

</style>
