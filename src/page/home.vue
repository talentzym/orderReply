<template>
  <div id="home">
    <vheader></vheader>
    <div class="tabs-pane-box">
      <el-menu :default-active="$route.path"
        class="el-menu-demo menu-box"
        mode="horizontal"
        :router="true"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/addOrder" v-if="myUserType === '1'">提交问题</el-menu-item>
        <el-menu-item index="/pendingOrder" v-if="myUserType === '1'">待处理问题</el-menu-item>
        <el-menu-item index="/processing" v-if="myUserType === '1'">处理中问题</el-menu-item>
        <el-menu-item index="/allOrder">所有问题</el-menu-item>
        <el-menu-item index="/addCustomerMsg" v-if="myUserType === '1'">客户信息录入</el-menu-item>
        <el-menu-item index="/customerList">客户信息列表</el-menu-item>
        <el-menu-item index="/accountList" v-if="myUserType === '3' || myUserType === '2'">员工信息列表</el-menu-item>
        <el-menu-item index="/managerList" v-if="myUserType === '3'">管理员列表</el-menu-item>
        <el-menu-item index="/setUp" v-if="myUserType === '3'">设置</el-menu-item>
        <el-submenu index="/accountMsg" v-if="myUserType === '1' || myUserType === '2'">
          <template slot="title">个人中心</template>
          <el-menu-item index="/myQuestion" v-if="myUserType === '1'">我提问的</el-menu-item>
          <el-menu-item index="/myAnswered" v-if="myUserType === '1'">我回答的</el-menu-item>
          <el-menu-item index="/isOver" v-if="myUserType === '1'">已完结的</el-menu-item>
          <el-menu-item index="/accountMsg" v-if="myUserType === '1' || myUserType === '2'">个人信息</el-menu-item>
        </el-submenu>
      </el-menu>
      <router-view/>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader';

export default {
  components: {
    'vheader': myheader
  },
  data () {
    return {
      activeIndex: '/addOrder'
    }
  },
  computed: {
    myUserType () {
      return this.$store.getters.getUserType
    }
  },
  methods: {
    handleSelect(key) {
      // console.log(key);
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
#home{
  .tabs-pane-box{
    width: 1200px;
    margin: 0 auto;
    padding: 0 50px;
    .menu-box{
      margin-bottom: 30px;
    }
  }
}
</style>
