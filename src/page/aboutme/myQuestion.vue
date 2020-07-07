<template>
  <div id="myquestion-list">
    <h2 style="margin-bottom:10px;">我提问的</h2>
    <el-table
      :header-cell-style="{background:'#f0f0f0',color:'#606266'}"
      :row-class-name="tableRowClassName"
      class="margin-bottom-10"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="depart"
        label="部门名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="问题类型"
        width="">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="320">
      </el-table-column>
      <!-- <el-table-column
        prop="tichuuser"
        label="提问者">
      </el-table-column> -->
      <el-table-column
        prop="contentstatus"
        label="处理状态">
        <template slot-scope="scope">
          <span class="btn-huifu">{{ dealContentStatus(scope.row.contentstatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="问题时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleClickdelete(scope.row)" type="text" size="small">删除</el-button> -->
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
  </div>
</template>

<script>
export default {
  data() {
      return {
        keyword: '',
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        total: 0
      }
    },
    computed: {
      myUserType () {
        return this.$store.getters.getUserType
      }
    },
    created () {
      this.getData()
    },
    methods: {
      handleClick (msg) {
        this.$store.commit('changeOrderId', msg.id)
        this.$router.push({
          name: 'orderPage',
          params: {
            id: msg.id,
            pageName: 'myquestion'
          }
        })
      },
      handleClickdelete (msg) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.HOST + '/deleteask',
            method: 'post',
            params: {
              id: msg.id
            },
            data: {},
            timeout: 5000,
          }).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      getData () {
        this.axios({
          url: this.HOST + '/myti',
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
            this.afresh('请重新登录！', 'warning')
          }
        })
      },
      handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.pageSize = val
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          this.getData()
      },
      tableRowClassName({row, rowIndex}){
        if (rowIndex % 2 === 1) {
          return 'success-row'
        }
        return ''
      },
      dealContentStatus(status){
        if (status === '0') {
          return '待回复'
        } else if (status === '1') {
          return '处理中'
        } else if (status === '2') {
          return '已完结'
        }
      }
    }
}
</script>

<style lang="less">
#myquestion-list{
  .important-keyword{
    width: 22%;
    margin-bottom: 20px;
  }
  .pagination{
    text-align: right;
  }
  .btn-huifu,.btn-wanjie{
    background: #fff;
    color: #008040;
    font-weight: bold;
    display: inline-block;
    padding: 1px 8px;
    border-radius: 5px;
  }
  .el-table .success-row{
    background: #f0f3f8;
  }

}
</style>
