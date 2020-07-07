import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push

Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default function createRouter () {
  return new Router({
    routes: [
      {
        path: '/',
        name: 'login',
        meta: {
          title: '登录'
        },
        component: resolve => { require(['@/components/login'], resolve) }
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          title: '注册'
        },
        component: resolve => { require(['@/components/register'], resolve) }
      },
      {
        path: '/demo',
        name: 'demo',
        meta: {
          title: 'demo'
        },
        component: resolve => { require(['@/page/demo'], resolve) }
      },
      {
        path: '/home',
        name: 'home',
        redirect: '/addOrder',
        component: resolve => { require(['@/page/home'], resolve) },
        children: [
          {
            path: '/addOrder',
            name: 'addOrder',
            meta: {
              title: '首页-提交'
            },
            component: resolve => { require(['@/page/addOrder'], resolve) }
          },
          {
            path: '/allOrder',
            name: 'allOrder',
            meta: {
              title: '首页-所有问题'
            },
            component: resolve => { require(['@/page/allOrder'], resolve) }
          },
          {
            path: '/pendingOrder',
            name: 'pendingOrder',
            meta: {
              title: '首页-待处理问题'
            },
            component: resolve => { require(['@/page/pendingOrder'], resolve) }
          },
          {
            path: '/processing',
            name: 'processing',
            meta: {
              title: '首页-处理中问题'
            },
            component: resolve => { require(['@/page/processing'], resolve) }
          },
          {
            path: '/addCustomerMsg',
            name: 'addCustomerMsg',
            meta: {
              title: '首页-客户信息录入'
            },
            component: resolve => { require(['@/page/addCustomerMsg'], resolve) }
          },
          {
            path: '/customerList',
            name: 'customerList',
            meta: {
              title: '首页-客户信息列表'
            },
            component: resolve => { require(['@/page/customerList'], resolve) }
          },
          {
            path: '/customerMsg/:id',
            name: 'customerMsg',
            meta: {
              title: '客户信息'
            },
            component: resolve => { require(['@/page/customerMsg'], resolve) }
          },
          {
            path: '/gendan/:id/:name',
            name: 'gendan',
            meta: {
              title: '跟单信息'
            },
            component: resolve => { require(['@/page/gendan'], resolve) }
          },
          {
            path: '/accountList',
            name: 'accountList',
            meta: {
              title: '首页-员工信息列表'
            },
            component: resolve => { require(['@/page/accountList'], resolve) }
          },
          {
            path: '/managerList',
            name: 'managerList',
            meta: {
              title: '首页-管理员列表'
            },
            component: resolve => { require(['@/page/managerList'], resolve) }
          },
          {
            path: '/setUp',
            name: 'setUp',
            meta: {
              title: '首页-管理员列表'
            },
            component: resolve => { require(['@/page/setUp'], resolve) }
          },
          {
            path: '/orderPage/:id/:pageName',
            name: 'orderPage',
            meta: {
              title: '工单详情'
            },
            component: resolve => { require(['@/page/orderPage'], resolve) }
          },
          {
            path: '/accountMsg',
            name: 'accountMsg',
            meta: {
              title: '个人中心-个人信息'
            },
            component: resolve => { require(['@/page/accountMsg'], resolve) }
          },
          {
            path: '/myQuestion',
            name: 'myQuestion',
            meta: {
              title: '个人中心-我提问的'
            },
            component: resolve => { require(['@/page/aboutme/myQuestion'], resolve) }
          },
          {
            path: '/myAnswered',
            name: 'myAnswered',
            meta: {
              title: '个人中心-我回答的'
            },
            component: resolve => { require(['@/page/aboutme/myAnswered'], resolve) }
          },
          {
            path: '/isOver',
            name: 'isOver',
            meta: {
              title: '个人中心-已完结的'
            },
            component: resolve => { require(['@/page/aboutme/isOver'], resolve) }
          }
        ]
      }
    ]
  })
}
