<template>
  <div id="gendan-page">
    <div class="card-box">
        <el-page-header @back="goBack" :content="'添加跟单记录：'+customerName" style="margin-bottom: 30px;"></el-page-header>
        <el-tabs type="border-card">
              <el-tab-pane label="跟单记录">
                  <el-button type="primary" size="mini" @click="dialogGendanVisible = true" v-if="myUserType === '1'">添加跟单</el-button>
                  <el-table
                    max-height="400"
                    stripe
                    class="tablebox"
                    :data="gendanTable"
                    style="width: 100%">
                    <el-table-column
                      fixed
                      prop="username"
                      label="跟单人员">
                      <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="跟单内容"
                      width="420">
                      <template slot-scope="scope">
                        <span>{{scope.row.content}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="跟单时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.createtime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="意向等级">
                      <template slot-scope="scope">
                        <el-tag size="mini" type="success">{{ showLevel(scope.row.level) }}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="nexttime"
                      label="下次跟单时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.nexttime}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>
    </div>
    <el-dialog title="添加跟单记录" :visible.sync="dialogGendanVisible">
      <el-form :model="genForm">
        <el-form-item label="跟单内容" :label-width="formLabelWidth1">
          <el-input type="textarea" v-model="genForm.content"></el-input>
        </el-form-item>
        <el-form-item label="下次跟单" :label-width="formLabelWidth1" style="width: 100%;">
            <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="genForm.nexttime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 50%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="意向提交" :label-width="formLabelWidth1">
            <el-select v-model="genForm.level" placeholder="请选择意向等级">
              <el-option :label="item.label" :value="item.value" v-for="item in dynamicTags" :key="item.label"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGendanVisible = false">取 消</el-button>
        <el-button type="primary" @click="addgendan">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        genForm: {
          content: '',
          nexttime: '',
          level: '',
        },
        formLabelWidth1: '80px',
        dynamicTags: [
          {
            label: 'A级',
            value: '1'
          },
          {
            label: 'B级',
            value: '2'
          },
          {
            label: 'C级',
            value: '3'
          },
          {
            label: 'D级',
            value: '4'
          }
        ],
        dialogGendanVisible: false,
        gendanTable: []
      }
    },
    computed: {
      customerId () {
        return this.$route.params.id
      },
      customerName () {
        return this.$route.params.name
      },
      myUserType () {
        return this.$store.getters.getUserType
      }
    },
    mounted () {
      this.getGendanList()
    },
    methods: {
      goBack () {
        this.routerLink('/customerList')
      },
      showLevel (val) {
        if (val === '1') {
          return 'A级'
        } else if (val === '2') {
          return 'B级'
        } else if (val === '3') {
          return 'C级'
        } else {
          return 'D级'
        }
      },
      getGendanList () {
        this.axios({
          url: this.HOST + '/gendanall',
          method: 'get',
          params: {
            id: this.customerId
          },
          data: {},
          timeout: 5000,
        }).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.gendanTable = res.data.data
          } else if (res.data.code === 100) {
            this.afresh('请登录！', 'warning')
          }
        })
      },
      addgendan () {
        console.log(this.genForm)
        // this.genForm
        this.genForm.customid = this.customerId
        this.axios({
          url: this.HOST + '/addgendan',
          method: 'post',
          params: {},
          data: this.genForm,
          timeout: 5000,
        }).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.dialogGendanVisible = false
            this.getGendanList()
          } else if (res.data.code === 100) {
            this.afresh('请登录！', 'warning')
          }
        })
      }
    }
  }
</script>

<style lang="less">
#gendan-page{
  .el-textarea__inner{
    width: 100%!important;
  }
}
</style>
