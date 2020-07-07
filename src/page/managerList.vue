<template>
  <div id="manager-list">
    <!-- <span class="font-size-24">部门管理</span> -->
    <div class="clearfix">
      <el-button type="primary" size="mini" round class="btn-class" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="loginname"
        label="用户名"
        width="">
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
        width="200">
        <template slot-scope="scope">
            <el-select v-model="scope.row.status" placeholder="请选择" size="mini" @change="userChangeSubmit(scope.row.status, scope.row.id)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="usertype"
        label="权限">
        <template>
          <span>管理员</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClickChangePwd(scope.row)" type="text" size="small" v-if="myUserType === '3'">重置密码</el-button>
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

    <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="30%" center>
        <el-form ref="manager_form" :model="manager_form">
            <el-form-item label="用户名" :label-width="formLabelWidth2">
                <el-input type="text" v-model="manager_form.username" style="width:100%;!important"></el-input>
            </el-form-item>
            <el-form-item label="密 码" :label-width="formLabelWidth2">
                <el-input type="password" v-model="manager_form.password" style="width:100%;!important"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addManager">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
        dialogVisible: false,
        formLabelWidth: '80px',
        formLabelWidth2: '65px',
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        information: {},
        manager_form: {
          username: '',
          password: ''
        },
        formLabelWidth: '120px',
        options: [
            {
                value: '0',
                label: '冻结'
            },
            {
                value: '1',
                label: '正常'
            }
        ]
      }
    },
    computed: {
      myUserType () {
        return this.$store.getters.getUserType
      }
    },
    created () {
      this.getListData()
    },
    methods: {
      addManager () {
        this.axios({
            url: this.HOST + '/registerroot',
            method: 'post',
            params: {},
            data: {
              username: this.manager_form.username,
              password: this.$md5(this.manager_form.password)
            },
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.getListData()
              this.dialogVisible = false
            }
          })
      },
      handleClickChangePwd (msg) {
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
              message: '管理员密码重置成功！'
            });
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            }); 
          }
        })
      },
      getListData () {
        this.axios({
          url: this.HOST + '/managerinfosssss',
          method: 'get',
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          console.log(res)
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
        this.getListData()
        this.dialogFormVisible = false
      },
      userChangeSubmit (status, id) {
        this.$confirm('确认修改此管理员的状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/updateuser',
            method: 'post',
            params: {},
            data: {
              id: id,
              status: status
            },
            timeout: 5000,
          }).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getListData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    }
}
</script>

<style lang="less">
#manager-list{
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
  .btn-class{
    vertical-align: bottom;
    float: right;
    // margin-left:20px;
  }
}
</style>
