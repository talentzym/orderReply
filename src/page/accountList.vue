<template>
  <div id="pending-order">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="loginname"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lianxidianhua"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ">
      </el-table-column>
      <el-table-column
        prop="weixin"
        label="微信">
      </el-table-column>
      <el-table-column
        prop="entry"
        label="入职时间">
      </el-table-column>
      <el-table-column
        prop="depart"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.status === '1' ? '正常' : '冻结' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'look')" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row, 'modify')" type="text" size="small" v-if="myUserType === '3'">修改</el-button>
          <!-- <el-button @click="deleteAccountInfo(scope.row)" type="text" size="small" v-if="myUserType === '3'">删除</el-button> -->
          <el-button @click="handleClickChangePwd(scope.row)" type="text" size="small" v-if="myUserType === '3' || myUserType === '2'">重置密码</el-button>
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

    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" class="big-dialog">
      <el-form :model="information" :inline="true">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginname">
          <el-input v-model="information.loginname" autocomplete="off" :disabled="disableFlag2"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="lianxidianhua">
          <el-input v-model="information.lianxidianhua" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth" prop="qq">
          <el-input v-model="information.qq" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth" prop="weixin">
          <el-input v-model="information.weixin" autocomplete="off" :disabled="disableFlag"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth" prop="entry">
          <el-date-picker
            :disabled="disableFlag"
            v-model="information.entry"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="information.status" placeholder="请选择活动区域" :disabled="disableFlag">
            <el-option label="正常" value="1"></el-option>
            <el-option label="冻结" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="status" :label-width="formLabelWidth">
          <el-select v-model="information.departid" placeholder="请选择活动区域" :disabled="disableFlag">
            <el-option :label="item.name" :value="item.id" v-for="(item, i) in depart" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeBigDiadlog">取 消</el-button>
        <el-button type="primary" @click="userChangeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
        formLabelWidth: '80px',
        keyword: '',
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        information: {},
        dialogFormVisible: false,
        formLabelWidth: '120px',
        disableFlag: false,
        disableFlag2: false,
        checkType: 1, //查看or修改
        userid: 0,
        depart: []
      }
    },
    computed: {
      myUserType () {
        return this.$store.getters.getUserType
      }
    },
    created () {
      this.getListData()
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
      // deleteAccountInfo(msg){

      // },
      handleClickChangePwd (msg) {
        this.$confirm('确认重置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios({
              url: this.HOST + '/resetpass',
              method: 'get',
              params: {
                id: msg.id
              },
              data: {},
              timeout: 5000,
            }).then((res) => {
              // console.log(res)
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '员工密码重置成功！'
                });
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.msg
                }); 
              }
            })
            // this.getListData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
        
      },
      handleClick (msg, type) {
        // console.log(msg)
        if (type === 'look') {
          this.checkType = 1
          this.disableFlag = true
          this.disableFlag2 = true
        } else {
          this.checkType = 2
          this.disableFlag = false
          this.disableFlag2 = true
        }
        this.information = msg
        this.dialogFormVisible = true
      },
      getListData () {
        this.axios({
          url: this.HOST + '/userinfosssss',
          method: 'get',
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
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
      closeBigDiadlog () {
        if (this.checkType !== 1) {
          this.getListData()
        }
        this.dialogFormVisible = false
      },
      userChangeSubmit () {
        this.axios({
            url: this.HOST + '/updateuser',
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
  .pagination{
    text-align: right;
  }
  .son-project{
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
        width: 250px;
      }
  }
}
</style>
