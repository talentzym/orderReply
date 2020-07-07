<template>
  <div id="pending-order">
    <div class="demo-input-suffix">
      关键字：
      <el-input
        class="important-keyword"
        size="medium"
        placeholder="请搜索公司名称"
        prefix-icon="el-icon-search"
        v-model="keyword">
      </el-input>
      <el-button size="medium" @click="getListData(keyword)">搜 索</el-button>
      <el-date-picker
        style="margin-left:30px;"
        v-model="timevalue"
        size="medium"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="medium" @click="getTimeData(timevalue)">查 询</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="usi"
        label="状态"
        width="">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.usi === '1' ? 'success' : 'danger'">{{ dealusiStatus(scope.row.usi) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="wanghao"
        label="旺号"
        width="">
      </el-table-column>
      <el-table-column
        prop="mima"
        label="密码"
        width="">
      </el-table-column>
      <el-table-column
        prop="gongsimingcheng"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="entrytime"
        label="合作时间">
      </el-table-column>
      <el-table-column
        prop="lianxishouji"
        label="联系手机">
      </el-table-column>
      <el-table-column
        prop="lianxiren"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="kehuguishu"
        label="业务员">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="230">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'look')" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row, 'modify')" type="text" size="small" v-if="scope.row.bianji === 1">修改</el-button>
          <el-button @click="gendanClick(scope.row)" type="text" size="small">跟单</el-button>
          <el-button @click="deleteCustomerInfo(scope.row)" type="text" size="small" v-if="myUserType === '3'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="big-dialog" width="1100px">
      <el-form :model="information" :inline="true">
        <el-form-item label="旺号" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.wanghao" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.mima" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.gongsimingcheng" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="联系手机" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.lianxishouji" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.gongsidizhi" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.lianxiren" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="传真号码" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.chuanzhenhaoma" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.youbian" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.lianxidianhua" autocomplete="off" :disabled="disableFlag1"></el-input>
        </el-form-item>
        <el-form-item label="客户归属" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.kehuguishu" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
        <el-form-item label="客服部人员" :label-width="formLabelWidth">
          <el-input size="small" v-model="information.kefuburenyuan" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
         <el-form-item size="small" label="设计部人员" :label-width="formLabelWidth">
          <el-input v-model="information.shejiburenyuan" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
        <el-form-item v-if="checkType === 2">
          <el-button size="small" type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
      </el-form>
      <div class="son-project">
        <h3 class="son-title">子项目</h3>
         <el-table
          :data="sonInfornation"
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
            prop="bieming"
            label="别名">
            <template slot-scope="scope">
              <span>{{scope.row.bieming}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bieming"
            label="站点">
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
              <el-tag size="mini" v-for="(span, i) in scope.row.guanjianci" :key="i" v-show="i <= 2">{{ span }}</el-tag>
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
            v-if="checkType === 2"
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native="handleClickSon(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeBigDiadlog">取 消</el-button>
        <el-button type="primary" @click="fatherFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改子项目" :visible.sync="dialogForm2">
      <el-form :model="tableColumn"  ref="tableColumn" :inline="true">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="leixing">
          <el-select v-model="tableColumn.leixing" placeholder="请选择网站类型">
            <el-option label="阿里巴巴" value="阿里巴巴"></el-option>
            <el-option label="企业网站" value="企业网站"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth" prop="bieming">
          <el-input v-model="tableColumn.bieming" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth" prop="guanjianci">
          <el-tag v-for="(span, i) in tableColumn.guanjianci" :key="i" v-show="i <= 2">{{ span }}</el-tag>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addKeyword(tableColumn.guanjianci, index)"></el-button>
          <!-- <el-input v-model="tableColumn.guanjianzi" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="旺号" :label-width="formLabelWidth" prop="wanghao">
          <el-input v-model="tableColumn.wanghao" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2 = false">取 消</el-button>
        <el-button type="primary" @click="modifySomFrom()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
        formLabelWidth: '60px',
        keyword: '',
        timevalue: '',
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        information: {},
        sonInfornation: {},
        dialogFormVisible: false,
        formLabelWidth: '120px',
        identityType: null,
        checkType: 1, //查看or修改
        dialogForm2: false,
        dialogTitle: '修改子项目信息',
        tableColumn: {},
        disableFlag1: true,
        disableFlag: false,
        userid: 0
      }
    },
    computed: {
      myUserType () {
        return this.$store.getters.getUserType
      }
    },
    mounted () {
      this.getListData()
    },
    methods: {
      dealusiStatus (status) {
        if (status === '0') {
          return '已到期'
        } else if (status === '1') {
          return '服务中'
        } else if (status === '2') {
          return '未开启'
        }
      },
      gendanClick (msg) {
        this.$router.push({
          name: 'gendan',
          params: {
            id: msg.id,
            name: msg.gongsimingcheng
          }
        })
      },
      getTimeData (val) {
        console.log(val)
        this.axios({
          url: this.HOST + '/getcustomDetailsinfo',
          method: 'get',
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            start: val[0],
            end: val[1]
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.total = res.data.total
          } else if (res.data.code === 100) {
            this.afresh('请登录！', 'warning')
          }
        })
      },
      deleteCustomerInfo (msg) {
        // console.log(msg)
        this.$confirm('删除该公司信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/deletecustominfo',
            method: 'post',
            params: {},
            data: {
              id: parseInt(msg.id)
            },
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getListData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      handleClick (msg, type) {
        // console.log(msg)
        if (type === 'look') {
          this.checkType = 1
          this.disableFlag = true
          this.dialogFormVisible = true
        } else {
          this.checkType = 2
          this.disableFlag = false
          this.$router.push({
            name: 'customerMsg',
            params: {
              id: msg.id
            }
          })
        }
        this.information = msg
        this.sonInfornation = msg.lists
        this.tableColumn = msg.lists
        // this.dialogFormVisible = true
      },
      getListData (word) {
        this.axios({
          url: this.HOST + '/getcustomDetailsinfo',
          method: 'get',
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            query: word
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.total = res.data.total
          } else if (res.data.code === 100) {
            this.afresh('请登录！', 'warning')
          }
        })
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          this.getListData()
      },
      handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.pageSize = val
      },
      handleClickSon (msg) {
        // console.log(msg)
        this.tableColumn = msg
        this.dialogForm2 = true
      },
      modifySomFrom () {
        // console.log(this.tableColumn)
        this.axios({
          url: this.HOST + '/updateuserdetailxia',
          method: 'post',
          params: {},
          data: this.tableColumn,
          timeout: 5000,
        }).then((res) => {
          // console.log(res)
          this.$message({
              type: 'success',
              message: '修改成功！'
          });
          this.dialogForm2 = false
          this.getListData()
        })
      },
      closeBigDiadlog () {
        if (this.checkType !== 1) {
          this.getListData()
        }
        this.dialogFormVisible = false
      },
      fatherFormSubmit () {
        if (this.checkType !== 1) {
          this.getListData()
        }
        this.dialogFormVisible = false
      },
      onSubmit () {
        this.axios({
            url: this.HOST + '/adduserdetailshang',
            method: 'post',
            params: {},
            data: this.information,
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.getListData()
              this.dialogFormVisible = false
            }
          })
      }
    }
}
</script>

<style lang="less">
#pending-order{
  .important-keyword{
    width: 22%;
    margin-bottom: 20px;
  }
  .pagination{
    text-align: right;
  }
  .el-tag{
      margin-right: 8px;
  }
  .son-project{
    padding: 0 20px;
    .son-title{
      display: inline-block;
      margin-right: 20px;
    }
  }
  .el-select{
      .el-input{
        width: 185px;
      }
    }
  .big-dialog{
    .el-input{
        width: 196px;
      }
  }
}
</style>
