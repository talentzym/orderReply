<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    myUserType () {
      return this.$store.getters.getUserType
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  created () {
    /* 注册全局页面跳转 */
    Vue.prototype.routerLink = (path, obj) => {
      this.$router.push({
        path: path,
        query: obj
      })
    }
    /* 注册全局页面替换 */
    Vue.prototype.routerReplace = (path, obj) => {
      this.$router.replace({
        path: path,
        query: obj
      })
    }
    /* 注册全局跳转登录页面的公共方法 */
    Vue.prototype.toLogin = path => {
      this.routerLink('/login', {
        path: path
      })
    }
    /* 登录失效 清除sessionStorage */
    Vue.prototype.afresh = (msg, type) => {
      this.$message({
        message: msg,
        type: type
      });
      sessionStorage.removeItem('Authorization');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userType');
      this.routerLink('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
