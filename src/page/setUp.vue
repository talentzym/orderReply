<template>
  <div id="set-up">
    <div class="depart">
        <span class="font-size-24">部门管理</span>
        <el-button type="primary" size="mini" round class="btn-class" @click="handleClickType('add')">添加</el-button>
        <template>
          <el-table
            :data="departArr"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="部门名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.status" placeholder="请选择" size="mini" @change="optionChange(scope.row.status, scope.row.id, 'depart')">
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
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button  @click="handleClickType('modify', scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
    </div>
    <div class="question" style="margin-top:80px;margin-bottom:100px;">
        <span class="font-size-24">问题类型管理</span>
        <el-button type="primary" size="mini" round class="btn-class" @click="handleClickTypeTwo('add')">添加</el-button>
        <template>
          <el-table
            :data="questionType"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="问题类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.status" placeholder="请选择" size="mini" @change="optionChange(scope.row.status, scope.row.id, 'question')">
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
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClickTypeTwo('modify', scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
    </div>
    <el-dialog :title="departTitle" :visible.sync="dialogVisible" width="40%" center>
        <el-form ref="newdepart" :model="newdepart">
            <el-form-item label="部门名称" :label-width="formLabelWidth1">
                <el-input type="text" v-model="newdepart.name" style="width:100%;!important"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="departSubmit">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="questionTitle" :visible.sync="dialogVisible2" width="40%" center>
        <el-form ref="newquestiontype" :model="newquestiontype" :label-width="formLabelWidth1">
            <el-form-item label="问题类型">
                <el-input type="text" v-model="newquestiontype.name" style="width:100%;!important"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="questionTypeSubmit">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth1: '80px',
      departTitle: '',
      questionTitle: '',
      departArr: [],
      questionType: [],
      dialogVisible: false,
      dialogVisible2: false,
      newdepart: {
        name: ''
      },
      newquestiontype: {
        name
      },
      options: [
          {
              value: '0',
              label: '冻结'
          },
          {
              value: '1',
              label: '正常'
          }
      ],
      departAddorModify: '1',
      questionAddorModify: '1',
      modifyId: 0
    }
  },
  created () {
    this.getDepartall()
    this.getQuestionall()
  },
  methods: {
    getDepartall () {
      this.axios({
        url: this.HOST + '/departall',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        this.departArr = res.data
      }).catch( res => {
          console.log(res)
      })
    },
    getQuestionall () {
      this.axios({
        url: this.HOST + '/questiontypeall',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
      }).then((res) => {
        // console.log(res)
        this.questionType = res.data
      }).catch( res => {
          console.log(res)
      })
    },
    handleClickType (type, msg) {
      console.log(msg)
      if (type === 'add') {
        this.departAddorModify = '1'
        this.departTitle = '添加部门'
        this.newdepart.name = ''
      } else {
        this.departAddorModify = '2'
        this.departTitle = '修改部门名称'
        this.modifyId = msg.id
        this.newdepart.name = msg.name
      }
      this.dialogVisible = true
    },
    departSubmit () {
      if (this.departAddorModify === '1') {
        this.axios({
          url: this.HOST + '/adddepart',
          method: 'get',
          params: {
            name: this.newdepart.name
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.dialogVisible = false
            this.getDepartall()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        }).catch( res => {
            console.log(res)
        })
      } else {
        this.axios({
          url: this.HOST + '/updatedepart',
          method: 'get',
          params: {
            id: this.modifyId,
            name: this.newdepart.name
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.dialogVisible = false
            this.getDepartall()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        }).catch( res => {
            console.log(res)
        })
      }
      
    },
    handleClickTypeTwo (type, msg) {
      console.log(msg)
      if (type === 'add') {
        this.questionAddorModify = '1'
        this.questionTitle = '添加问题类型'
        this.newquestiontype.name = ''
      } else {
        this.questionAddorModify = '2'
        this.questionTitle = '修改问题类型名称'
        this.modifyId = msg.id
        this.newquestiontype.name = msg.name
      }
      this.dialogVisible2 = true
    },
    questionTypeSubmit () {
      if (this.questionAddorModify === '1') {
          this.axios({
            url: this.HOST + '/addquestiontype',
            method: 'get',
            params: {
              name: this.newquestiontype.name
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.dialogVisible2 = false
              this.getQuestionall()
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }).catch( res => {
              console.log(res)
          })
      } else {
        this.axios({
            url: this.HOST + '/updatequestiontype',
            method: 'get',
            params: {
              name: this.newquestiontype.name,
              id: this.modifyId
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.dialogVisible2 = false
              this.getQuestionall()
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }).catch( res => {
              console.log(res)
          })
      }
      
    },
    optionChange (val, iid, type) {
      console.log(val, iid)
      if (type === 'depart') {
        this.$confirm('确认修改此部门的状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/updatedepart',
            method: 'post',
            params: {
              id: iid,
              status: val
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getDepartall()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      } else {
        this.$confirm('确认修改此问题类型的状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/updatequestiontype',
            method: 'post',
            params: {
              id: iid,
              status: val
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getQuestionall()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
      
    },
    handleClickdelete (val) {

    },
    handleClickmodify (val) {

    }
  }
}
</script>

<style lang="less">
#set-up{
  .btn-class{
    vertical-align: bottom;
    margin-left:20px;
  }
}

</style>
